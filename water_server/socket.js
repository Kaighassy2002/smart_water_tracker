const socketIo = require("socket.io");

module.exports = function (server) {
  const io = socketIo(server);

  setInterval(() => {
    const randomData = (Math.random() * 100).toFixed(2);
    io.emit("sensor-data", randomData);
  }, Math.floor(Math.random() * 1000) + 1000);
};
