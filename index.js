// Print a greeting message
console.log("Hello, World!");

// Print the current value of global.luckynumber (should be undefined at first)
console.log(global.luckynumber);

// Set a global variable 'luckynumber' to 42
global.luckynumber = 42;

// Print the new value of global.luckynumber
console.log(global.luckynumber);

// Print the current operating system platform (e.g., 'darwin' for macOS)
console.log(process.platform);

// Print the current user's username from environment variables
console.log(process.env.USER);

// Register a handler to run when the Node.js process is about to exit
process.on('exit', function() {
    console.log("Exiting the process...");
})

// Import the EventEmitter class from the 'events' module (ESM syntax)
// import { EventEmitter } from 'events'; // Uncomment this line if using ESM syntax
const { EventEmitter } = require('events'); // Uncomment this line if using CommonJS syntax

// Create a new EventEmitter instance
const eventEmitter = new EventEmitter();

// Register a listener for the 'lunch' event that prints a message
eventEmitter.on('lunch', () => {
    console.log("Lunch time!");
})

// Emit (trigger) the 'lunch' event twice
eventEmitter.emit('lunch');
eventEmitter.emit('lunch');


const { readFile, readFileSync, read } = require('fs'); // Sync == Blocking
// import { readFile, readFileSync } from 'fs'; // Uncomment this line if using ESM syntax

const txt = readFileSync('hello.txt', 'utf8'); // Read the file synchronously
console.log(txt); // Print the content of the file

console.log("IF THIS BELOW TXT ITS BLOCKED == SYNC");

console.log("------------------------------");

readFile('hello.txt', 'utf8', (err, data) => {
    console.log(txt)
}); // Read the file asynchronously == Non-blocking

console.log("IF THIS ABOVE TXT ITS NOT BLOCKED == ASYNC"); 
// with nonblocking above will run first and text will be printed after




const myModule = require('./my-module'); // Import a custom module named 'myModule'
console.log(myModule); // Print the exported content of 'myModule'



const express = require('express'); // Import the Express framework

const app = express(); // Create an Express application instance

// app.get('/', (request, response) => {

//     readFile('./home.html', 'utf8', (err, html) => {
//         if (err) {
//             response.status(500).send('Error reading file');
//         }

//         response.send(html);

//     })


// });
const fs = require('fs');
const fsPromises = require('fs').promises;

app.get('/', async (request, response) => {
    try {
        const html = await fsPromises.readFile('./home.html', 'utf8'); // Read the HTML file asynchronously
        response.send(html); // Send the HTML content as a response
    } catch (err) {
        response.status(500).send('Error reading file'); // Handle errors by sending a 500 status code
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running on port 3000 http://localhost:3000')); // Start the server on port 3000 or the port specified in the environment variable PORT

