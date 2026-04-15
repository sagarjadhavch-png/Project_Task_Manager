const service = require('../services/taskService');
const { findById } = require('../services/projectService');

const getAll = (req, res) => {
  try {
    const tasks = service.getAll(req.query);
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

 const create = (req, res) => {
  try {
    const { projectId } = req.body;
 
    const project = findById(projectId);
    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const task = service.create(req.body);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const update = (req, res) => {
  try {
    const task = service.update(req.params.id, req.body);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const remove = (req, res) => {
  try {
    service.remove(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = { getAll, create, update, remove };