const { Server } = require("socket.io");

let io = null;

function setupWebSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // o restringeix al teu frontend si ho prefereixes
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connectat per WebSocket");

    socket.on("disconnect", () => {
      console.log("❌ Client desconnectat");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO no està inicialitzat!");
  }
  return io;
}

module.exports = {
  setupWebSocket,
  getIO,
};
