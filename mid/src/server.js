import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'



const app = express();
const PORT = process.env.PORT || 3000;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the dir name from the file path
const __dirname = dirname(__filename);

// MIDDLEWARE
app.use(express.json()); // this allow us to read body(json) in requests. for example register req that includes credentials in json format
// serves the html file from the /public dir
// tells express to serve all files from the public folder as static assets /
// file. any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// serving up the html file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

