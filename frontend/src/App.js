import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://3mthkup3hl.execute-api.us-east-1.amazonaws.com/prod';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  // Load tasks on startup
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      console.log('Loading tasks...');
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      
      console.log('Server response:', data);
      
      // Make sure data is an array
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setError('Server returned invalid data');
        setTodos([]);
      }
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error:', err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      setError('Please enter a task');
      return;
    }

    try {
      setError('');
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setTodos([result, ...todos]);
        setNewTask('');
      } else {
        setError(result.error || 'Failed to add task');
      }
    } catch (err) {
      setError('Failed to add task');
      console.error('Error:', err);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      const updatedTask = await response.json();
      
      if (response.ok) {
        setTodos(todos.map(task => 
          task.id === taskId ? updatedTask : task
        ));
      } else {
        setError('Failed to update task');
      }
    } catch (err) {
      setError('Failed to update task');
      console.error('Error:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/todos/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(task => task.id !== taskId));
      } else {
        setError('Failed to delete task');
      }
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1> My To-Do List</h1>
        
        {error && (
          <div className="error">
            {error}
            <button onClick={() => setError('')} className="close-btn">×</button>
          </div>
        )}
        
        <div className="add-section">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} disabled={!newTask.trim()}>
            Add Task
          </button>
        </div>

        <div className="tasks-section">
          {todos.length === 0 ? (
            <div className="empty">
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {todos.map(task => (
                <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => toggleTask(task.id, task.completed)}
                    />
                    <span className="task-text">{task.task}</span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;