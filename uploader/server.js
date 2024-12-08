const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = 5000;
let filename;
let fileHandle;
let fileWriteStream;

const server = net.createServer();

server.on("connection", async (socket) => {
  console.log("New Connection!");

  socket.on("data", async (data) => {
    if (fileWriteStream) {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    } else {
      socket.pause();
      if (data.subarray(0, 8).toString() === "filename") {
        filename = data.subarray(9).toString();
        fileHandle = await fs.open(`storage/${filename}`, "w");
        fileWriteStream = fileHandle.createWriteStream();
        fileWriteStream.on("drain", () => {
          socket.resume();
        });
        socket.resume();
      }
    }
  });

  socket.on("end", async () => {
    await fileHandle.close();
    console.log("Connection Ended!");
    fileHandle = undefined;
    fileWriteStream = undefined;
  });
});

server.listen(PORT, "localhost", () => {
  console.log("Server is lestining on", server.address());
});
