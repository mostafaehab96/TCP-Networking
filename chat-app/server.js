const net = require("node:net");

PORT = 4000;
HOST = "localhost";
const server = net.createServer();
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;

  clients.map((client) => {
    client.socket.write(`User ${clientId} joined`);
  });

  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-") + 9);
    clients.forEach((client) => {
      client.socket.write(`User-${id}: ${message}`);
    });
  });
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  socket.on("error", (err) => {
    console.log("Error occurred!");
  });

  clients.push({ id: clientId, socket });
});

server.listen(PORT, HOST, () => {
  console.log("Listening on port 8000");
});
