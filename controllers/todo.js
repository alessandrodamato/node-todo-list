const Todo = require('../models/todo');

exports.getAllTodos = (req, res, next) => {
  Todo.findAll()
    .then(todos => {
      res.status(201).json({
        todos: todos
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Errore nel caricamento dei todos',
        errors: err
      });
    });
}

exports.saveTodos = (req, res, next) => {
  Todo.destroy({ where: {} })
    .then(() => {
      const todos = req.body.map(todo => ({
        content: todo.content,
        completed: todo.completed
      }));

      return Todo.bulkCreate(todos);
    })
    .then(() => {
      res.status(201).json({
        message: 'Todos salvati con successo',
        todos: req.body
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'Errore nel salvataggio dei todos' });
    });
};
