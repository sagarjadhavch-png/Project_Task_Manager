const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});