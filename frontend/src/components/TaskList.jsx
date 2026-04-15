 import { useState, useEffect } from 'react';
import { getTasks } from '../api';
import TaskItem from './TaskItem';

export default function TaskList({ projectId, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = () => {
    setLoading(true);
    getTasks(projectId, filter)
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, [projectId, refresh, filter]);

  const counts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['', 'todo', 'in-progress', 'done'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '0.35rem 0.8rem',
                borderRadius: '20px',
                border: '1px solid #d1d5db',
                background: filter === s ? '#1d4ed8' : 'white',
                color: filter === s ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: filter === s ? '600' : '400'
              }}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span style={{ background: '#fef9c3', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
            Todo: {counts.todo}
          </span>
          <span style={{ background: '#7da4d8', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
            In Progress: {counts['in-progress']}
          </span>
          <span style={{ background: '#669075', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
            Done: {counts.done}
          </span>
        </div>
      </div>

      {loading && <p style={{ color: '#6b7280' }}>Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#9ca3af',
          border: '2px dashed #e5e7eb',
          borderRadius: '12px'
        }}>
          <p>No tasks found.</p>
          <p style={{ fontSize: '0.85rem' }}>Add a task above to get started!</p>
        </div>
      )}

      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onChanged={loadTasks} />
      ))}
    </div>
  );
}