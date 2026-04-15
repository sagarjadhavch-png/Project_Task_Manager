import { useState } from 'react';
import { deleteProject } from '../api';

export default function ProjectList({ projects, selected, onSelect, onDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (e, project) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${project.name}" and all its tasks?`)) return;
    setDeletingId(project.id);
    await deleteProject(project.id);
    setDeletingId(null);
    onDeleted(project.id);
  };

  if (projects.length === 0) {
    return (
      <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
        No projects yet. Create one above!
      </p>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
      {projects.map(p => (
        <li
          key={p.id}
          onClick={() => onSelect(p)}
          style={{
            padding: '0.7rem 1rem',
            marginBottom: '0.4rem',
            cursor: 'pointer',
            borderRadius: '8px',
            background: selected?.id === p.id ? '#dbeafe' : '#f9fafb',
            border: selected?.id === p.id
              ? '1px solid #93c5fd'
              : '1px solid #e5e7eb',
            fontWeight: selected?.id === p.id ? '600' : '400',
            color: selected?.id === p.id ? '#1d4ed8' : '#374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            opacity: deletingId === p.id ? 0.5 : 1,
            transition: 'all 0.15s ease',
            minWidth: 0,       
          }}
        >
          
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            overflow: 'hidden',
            minWidth: 0,
            flex: 1,
          }}>
            <span style={{ flexShrink: 0 }}>📁</span>
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
            }}
              title={p.name}  
            >
              {p.name}
            </span>
          </span>

           
          <button
            onClick={(e) => handleDelete(e, p)}
            disabled={deletingId === p.id}
            style={{
              flexShrink: 0,
              padding: '0.2rem 0.5rem',
              background: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fca5a5',
              borderRadius: '5px',
              cursor: deletingId === p.id ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem',
            }}
          >
            🗑 Delete
          </button>
        </li>
      ))}
    </ul>
  );
}