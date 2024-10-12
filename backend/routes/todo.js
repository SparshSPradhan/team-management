// routes/todo.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new to-do item
router.post('/', async (req, res) => {
  const { teamId, userId, title } = req.body; // Include userId in the request

  const newTodo = new Todo({
    teamId,
    userId, // Save the userId of the creator
    title
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create todo' });
  }
});

// Get all to-do items for a specific team
router.get('/:teamId', async (req, res) => {
  try {
    const todos = await Todo.find({ teamId: req.params.teamId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch todos' });
  }
});

// Update a to-do item
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update todo' });
  }
});

// Delete a to-do item
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete todo' });
  }
});

module.exports = router;
