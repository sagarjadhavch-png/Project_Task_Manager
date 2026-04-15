const service = require('../services/projectService');
const taskService = require('../services/taskService');

const getAll = (req, res) => {
  try {
    const projects = service.getAll();
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const create = (req, res) => {
  try {
    const { name } = req.body;
    const project = service.create(name);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const remove = (req, res) => {
  try {
    const { id } = req.params;
   
    taskService.removeByProjectId(id);
   
    service.remove(id);
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = { getAll, create, remove };