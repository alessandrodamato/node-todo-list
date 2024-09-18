const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/get-all', todoController.getAllTodos);

router.post('/save', todoController.saveTodos);

module.exports = router;