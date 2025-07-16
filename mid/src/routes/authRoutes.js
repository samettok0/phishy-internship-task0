import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

// register a new user endpoint at /auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 8);

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`);
        const result = insertUser.run(username, hashed);

        const defaultTodo = "Hello! This is your first todo!"
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`) // template sql script
        insertTodo.run(result.lastInsertRowid, defaultTodo) // replaces above ? marks with actual values that has been passed to this function

        // create JWT token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_secret, { expiresIn: "24h" })
        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }


})
// login a new user endpoint at /auth/login
router.post('/login', (req, res) => {

})


export default router

