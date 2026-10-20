const rect = document.getElementById("rect");
let x = 100, y = 100;
const step = 10;
const analogScale = 8;
let analogX = 0, analogY = 0; // estado actual del joystick

const URL_WS = "ws://localhost:3000";
const estado = document.getElementById("estado");
const mostrar = (txt) => (estado.textContent = txt);
mostrar("Servidor: " + URL_WS + " | conectando...");

const socket = new WebSocket(URL_WS);
socket.onopen = () => mostrar("Servidor: " + URL_WS + " | conectado | esperando mando...");
socket.onclose = () => mostrar("Servidor: " + URL_WS + " | DESCONECTADO");

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    if (data.info) {
      document.getElementById("ayuda").textContent =
        "En la app escribí -> Celular real: IP " + data.info.ips.join(" o ") +
        " | Emulador: IP 10.0.2.2 | Puerto: " + data.info.puerto;
      return;
    }
    mostrar("Servidor: " + URL_WS + " | último mensaje: " + event.data);
    if (data.action) moveRectDigital(data.action);
    else if (typeof data.x === "number" && typeof data.y === "number") {
      analogX = data.x;
      analogY = data.y;
    }
  } catch (err) {
    console.error("Error al procesar mensaje:", err);
  }
};

const teclas = { ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT" };
document.addEventListener("keydown", (e) => {
  const action = teclas[e.key];
  if (!action) return;
  socket.send(JSON.stringify({ action }));
  moveRectDigital(action);
});

function moveRectDigital(action) {
  if (action === "UP") y -= step;
  if (action === "DOWN") y += step;
  if (action === "LEFT") x -= step;
  if (action === "RIGHT") x += step;
  updatePosition();
}

function analogLoop() {
  x += analogX * analogScale;
  y -= analogY * analogScale;
  updatePosition();
  requestAnimationFrame(analogLoop);
}
analogLoop();

function updatePosition() {
  x = Math.min(Math.max(0, x), window.innerWidth - 50);
  y = Math.min(Math.max(0, y), window.innerHeight - 50);
  rect.style.left = x + "px";
  rect.style.top = y + "px";
}
