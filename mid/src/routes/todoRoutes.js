import express from 'express'
import db from '../db.js'

const router = express.Router();

// get all todos from logged in user
router.get('/', (req, res) => {
    const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
    const todos = getTodos.all(req.userId);
    res.json(todos);
})

// create a new todo
router.post('/', (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?,?)')
    const result = insertTodo.run(req.userId, task);

    res.json({ id: result.lastInsertRowid, task, completed: 0 });
})

// update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body;
    const { id } = req.params // params takes you to access id via /:id
    const { page } = req.query

    const updatedTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?")

    updatedTodo.run(completed, id)
    res.json({ message: "Todo completed" })
})

// delete a todo
router.delete('/:id', (req, res) => {

})

export default router
