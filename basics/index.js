const express = require('express'); // Import the Express framework

const app = express(); // Create an Express application instance


const fs = require('fs');
const fsPromises = require('fs').promises;

let data = {
    name: "HASSANSABBAH"
}


// type one endpoints: Website endpoints (these endpoints are for sending back html and they typically come when a user enderts a url in a browser)
app.get('/', async (request, response) => {
    try {
        const html = await fsPromises.readFile('./home.html', 'utf8'); // Read the HTML file asynchronously
        response.send(html); // Send the HTML content as a response
    } catch (err) {
        response.status(500).send('Error reading file'); // Handle errors by sending a 500 status code
    }
});



// type two endpoints where you directly communicate with DB (API endpoints)
app.get('/api/data', (request, response) => {
    console.log("this one was for JSON")
    response.send(data)
})


app.post('/api/data', (req, res) => {
    const newEntry = req.body
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000')
}); // Start the server on port 3000 or the port specified in the environment variable PORT

