import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();

// get all todos from logged in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos);
})

// create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body;

    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json({ id: result.lastInsertRowid, task, completed: 0 });
})

// update a todo
router.put('/:id', async (req, res) => {
    const { completed } = req.body;
    const { id } = req.params // params takes you to access id via /:id

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id), // if todo's own id matches where it passed from url /
            userId: req.userId // and user id matches
        },
        data: {
            completed: Boolean(completed)
        }
    })

    res.json({ message: "Todo completed" })
})

// delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({ message: "Deleted Successfully" })
})

export default router
