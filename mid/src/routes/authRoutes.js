import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router();

// register a new user endpoint at /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 8);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const defaultTodo = "Hello! This is your first todo!"
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                id: user.id
            }
        })
       
        // create JWT token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: "24h" })
        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }


})
// login a new user endpoint at /auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // if user not found = its null
        if (!user) {
            return res.status(404).send({ // return response 404 code error
                message: "User not found"
            });
        }

        const ispwValid = bcrypt.compareSync(password, user.password); // turn pw to hashed value and, compare that hash with stored hash in db
        if (ispwValid === false) { // if pw is not matched
            return res.status(401).send({ // return 401 coded error 
                message: "Invalid password!"
            })
        }

        // if we didnt return anything from above code that means we are in
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }

})


export default router

