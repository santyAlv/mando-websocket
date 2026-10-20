import WebSocket, { WebSocketServer } from "ws";
import { networkInterfaces } from "os";

const PUERTO = 3000;
const ips = Object.values(networkInterfaces()).flat()
  .filter((i) => i.family === "IPv4" && !i.internal).map((i) => i.address);

const wss = new WebSocketServer({ port: PUERTO }); // escucha en todas las interfaces (el celular entra por la IP de la PC)
console.log("Servidor WebSocket escuchando en ws://localhost:3000");

wss.on("connection", (ws, req) => {
  console.log("Cliente conectado desde", req.socket.remoteAddress);
  ws.send(JSON.stringify({ info: { ips, puerto: PUERTO } })); // para que la web muestre qué poner en la app
  ws.on("message", (message) => {
    const texto = message.toString();
    console.log("Mensaje recibido:", texto);
    // Reenvía a los demás (no al emisor: la web ya se movió sola con el teclado)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) client.send(texto);
    });
  });
  ws.on("close", () => console.log("Cliente desconectado"));
});
