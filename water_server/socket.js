const socketIo = require("socket.io");

module.exports = function (server) {
  const io = socketIo(server, {
    
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Emit sensor data every 2 seconds
    const interval = setInterval(() => {
      const randomData = (Math.random() * 100).toFixed(2);
      const timestamp = new Date().toISOString();
      socket.emit("sensor-data", { value: randomData, timestamp });
    }, 2000); // ⏱ 2 seconds

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      clearInterval(interval); // Clean up on disconnect
    });
  });
};
