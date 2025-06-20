//lab 8 Noah G.

const { error } = require('console');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

// #3: TODO:
// Serve static files from public subfolder using .use(), express.static(), and path.join().
// Rather than __dirname, use process.cwd()
app.use(express.static(path.join(process.cwd(), 'public')));

app.get("/photos", (request, response) => {
  // #1 TODO:
  // Retrieve JSONPlaceholder photos using fetch() and return first 20 photos as JSON.
  // You must use fetch () chain method with two .then() and a .catch().
  // The first .then() must convert from JSON.
  // The second .then() must return first 20 photos with status of 200 as JSON array of photo objects.
  // The .catch() must return code 500 with any error message as JSON and an error property.
  fetch('https://jsonplaceholder.typicode.com/photos')
  .then(res => res.json())
  .then(json => response.status(200).type("application/json").send(json.slice(0,20))
)
  .catch((err) =>
    response
  .status(500)
  .type("application/json")
  .send({error: `${err}`})
);
});

app.get("/photos/:id", (request, reply) => {
  // #2 TODO:
  // Retrieve a single photo given information given id from JSONPlaceholder and return as JSON
  // You must use fetch () chain method with two .then() and a .catch().
  // The first .then() must convert from JSON.
  // The second .then() must return photos with status of 200 as JSON single photo object.
  // The .catch() must return code 500 with any error message as JSON and an error property.
  const {id} = request.params
  const photoId = parseInt(id);
    fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
  .then(res => res.json())
  .then(json => reply.status(200).type("application/json").send(json)
)
  .catch((err) =>
    reply
  .status(500)
  .type("application/json")
  .send({error: `${err}`})
);
});

// Handle 404 for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('Working directory:', process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});