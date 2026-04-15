 const BASE = 'http://localhost:3001';

export const getProjects = async () => {
  const res = await fetch(`${BASE}/projects`);
  return res.json();
};

export const createProject = async (name) => {
  const res = await fetch(`${BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
};

export const deleteProject = async (id) => {
  await fetch(`${BASE}/projects/${id}`, { method: 'DELETE' });
};

export const getTasks = async (projectId, status = '') => {
  const params = new URLSearchParams({ projectId });
  if (status) params.append('status', status);
  const res = await fetch(`${BASE}/tasks?${params}`);
  return res.json();
};

export const createTask = async (title, projectId) => {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, projectId })
  });
  return res.json();
};

export const updateTask = async (id, status) => {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
};