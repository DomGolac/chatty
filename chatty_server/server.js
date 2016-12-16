const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  sendUserCount(wss.clients.length);
  // console.log(wss.clients, wss.clients.length);
  ws.on('message', parseMessage);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    sendUserCount(wss.clients.length);
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

function sendUserCount(count) {
  data = {count: count, type: "incomingCount"};
  data = JSON.stringify(data);
  wss.broadcast(data);
}

function parseMessage(data) {
  data = JSON.parse(data);
  data.id = uuid.v4();
  switch (data.type) {
    case "postMessage":
      data.type = "incomingMessage";
    break;
    case "postNotification":
      data.type = "incomingNotification";
    break;
  }
  data = JSON.stringify(data);
  wss.broadcast(data);
}