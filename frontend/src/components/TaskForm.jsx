import { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ projectId, onCreated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createTask(title.trim(), projectId);
      setTitle('');
      onCreated();
    } catch (e) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value); setError(''); }}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: '0.6rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.95rem'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.95rem'
          }}
        >
          {loading ? '...' : '+ Add Task'}
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