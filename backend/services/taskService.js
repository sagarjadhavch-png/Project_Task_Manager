 const { findById: findProject } = require('./projectService');

let tasks = [];
let nextId = 1;

const VALID_STATUS = ['todo', 'in-progress', 'done'];

const getAll = ({ projectId, status } = {}) => {
  let result = [...tasks];

  if (projectId) {
    result = result.filter(t => t.projectId === Number(projectId));
  }

  if (status) {
    result = result.filter(t => t.status === status);
  }

  return result;
};

const create = ({ title, projectId }) => {
  if (!title || !title.trim()) {
    throw new Error('Task title is required');
  }

  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const project = findProject(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    status: 'todo',
    projectId: Number(projectId)
  };

  tasks.push(task);
  return task;
};

const update = (id, { status }) => {
  if (!status) {
    throw new Error('Status is required');
  }

  if (!VALID_STATUS.includes(status)) {
    throw new Error(`Invalid status. Allowed values: ${VALID_STATUS.join(', ')}`);
  }

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
    throw new Error('Task not found');
  }

  task.status = status;
  return task;
};

const remove = (id) => {
  const index = tasks.findIndex(t => t.id === Number(id));
  if (index === -1) {
    throw new Error('Task not found');
  }
  tasks.splice(index, 1);
};

 
const removeByProjectId = (projectId) => {
  tasks = tasks.filter(t => t.projectId !== Number(projectId));
};

module.exports = { getAll, create, update, remove, removeByProjectId };