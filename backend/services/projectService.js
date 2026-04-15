 let projects = [];
let nextId = 1;

const getAll = () => {
  return projects;
};

const create = (name) => {
  if (!name || !name.trim()) {
    throw new Error('Project name is required');
  }
  const project = {
    id: nextId++,
    name: name.trim()
  };
  projects.push(project);
  return project;
};

const findById = (id) => {
  return projects.find(p => p.id === Number(id));
};

const remove = (id) => {
  const index = projects.findIndex(p => p.id === Number(id));
  if (index === -1) {
    throw new Error('Project not found');
  }
  projects.splice(index, 1);
};

module.exports = { getAll, create, findById, remove };