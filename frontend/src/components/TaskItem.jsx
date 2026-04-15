  import { useState } from 'react';
import { updateTask, deleteTask } from '../api';

const statusStyles = {
  'todo': { background: '#fef9c3', border: '#fde047', label: '📋 Todo' },
  'in-progress': { background: '#dbeafe', border: '#93c5fd', label: '🔄 In Progress' },
  'done': { background: '#dcfce7', border: '#86efac', label: '✅ Done' }
};

export default function TaskItem({ task, onChanged }) {
  const [loading, setLoading] = useState(false);

  const handleStatus = async (e) => {
    setLoading(true);
    await updateTask(task.id, e.target.value);
    setLoading(false);
    onChanged();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    setLoading(true);
    await deleteTask(task.id);
    onChanged();
  };

  const style = statusStyles[task.status] || statusStyles['todo'];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.8rem 1rem',
      marginBottom: '0.6rem',
      borderRadius: '10px',
      background: style.background,
      border: `1px solid ${style.border}`,
      opacity: loading ? 0.6 : 1,
      transition: 'opacity 0.2s'
    }}>
      <span style={{ flex: 1, fontWeight: '500', color: '#111827' }}>
        {task.title}
      </span>
      <select
        value={task.status}
        onChange={handleStatus}
        disabled={loading}
        style={{
          padding: '0.35rem 0.5rem',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          background: 'white',
          fontSize: '0.85rem',
          cursor: 'pointer'
        }}
      >
        <option value="todo">📋 Todo</option>
        <option value="in-progress">🔄 In Progress</option>
        <option value="done">✅ Done</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          padding: '0.35rem 0.7rem',
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fca5a5',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem'
        }}
      >
        🗑 Delete
      </button>
    </div>
  );
}