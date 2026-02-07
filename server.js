import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

// Connection event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Server Broadcast: ${message}`);
    });
  });
  socket.on("error", (error) => {
    console.error(`Error from client ${ip}:`, error);
  });
  socket.on("close", () => {
    console.log(`Client ${ip} disconnected`);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");