const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

app.get('/', (req, res) => {
  res.send('API is running. Use /api/tasks to interact with tasks.');
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = true;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
