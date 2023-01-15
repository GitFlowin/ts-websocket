import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

// When a client connection is established.
wss.on("connection", (ws: WebSocket) => {
  ws.send('Connection made to the WebSocket Server 🔌');

  // When message is received.
  ws.on('message', (message: string) => {
    console.log(`Recieved: ${message}`);

    // Broadcast the response to all clients except self.
    wss.clients.forEach(client => {
      if (client != ws) client.send(`Broadcast Message: ${message}`);
    })

    // Individual client response
    // ws.send(`The server received: ${message}`);
  });
});

server.listen(3000, () => {
  console.log("Server Initialized 🚀");
});
