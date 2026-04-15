 import { useState, useEffect } from 'react';
import { getProjects } from './api';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load projects. Is the backend running?');
        setLoading(false);
      });
  }, [refresh]);

  const triggerRefresh = () => setRefresh(r => !r);

   
  const handleProjectDeleted = (deletedId) => {
    if (selectedProject?.id === deletedId) {
      setSelectedProject(null);
    }
    triggerRefresh();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Project & Task Manager</h1>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <h2>Projects</h2>
          <ProjectForm onCreated={triggerRefresh} />
          {loading && <p className="info-text">Loading...</p>}
          {error && <p className="error-text">{error}</p>}
          <ProjectList
            projects={projects}
            selected={selectedProject}
            onSelect={setSelectedProject}
            onDeleted={handleProjectDeleted}
          />
        </aside>
        <main className="main-content">
          {selectedProject ? (
            <>
              <h2 className="project-title">{selectedProject.name}</h2>
              <TaskForm
                projectId={selectedProject.id}
                onCreated={triggerRefresh}
              />
              <TaskList
                projectId={selectedProject.id}
                refresh={refresh}
              />
            </>
          ) : (
            <div className="empty-state">
              <p>👈 Select a project to view tasks</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}