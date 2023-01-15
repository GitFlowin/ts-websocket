import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    console.log(`Recieved: ${message}`);

    // Broadcast
    wss.clients.forEach(client => {
      // Send to all clients except self
      if (client != ws) client.send(`Broadcast Message: ${message}`);
    })

    // Individual client response
    // ws.send(`The server received: ${message}`);
  });

  //send immediatly a feedback to the incoming connection    
  ws.send('Connection made to the WebSocket Server 🔌');
});

server.listen(3000, () => {
  console.log("Server Initialized 🚀");
});
