import { useState } from 'react';
import { createProject } from '../api';

export default function ProjectForm({ onCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Project name cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createProject(name.trim());
      setName('');
      onCreated();
    } catch (e) {
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={handleKeyDown}
          placeholder="New project name"
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.9rem'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            background: '#1d4ed8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {loading ? '...' : 'Add'}
        </button>
      </div>
      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.3rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}
