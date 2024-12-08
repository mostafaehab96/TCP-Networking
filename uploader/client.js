const net = require("node:net");
const fs = require("node:fs/promises");
const process = require("node:process");
const { basename } = require("node:path");

const HOST = "localhost";
const PORT = 5000;

if (process.argv.length !== 3) {
  console.error("USAGE: node client.js [filepath]");
  process.exit(1);
}

const filepath = process.argv[2];

const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  let fileHandle;
  let fileReadStream;
  let totalSize;
  try {
    fileHandle = await fs.open(filepath, "r");
    const filename = basename(filepath);
    fileReadStream = fileHandle.createReadStream();
    totalSize = (await fileHandle.stat()).size;
    socket.write(`filename-${filename}`);
  } catch (err) {
    console.error(err);
    socket.end();
    process.exit(1);
  }

  let copiedSize = 0;

  fileReadStream.on("data", (data) => {
    copiedSize += data.length;
    const percentage = ((copiedSize / totalSize) * 100).toFixed(2);
    process.stdout.write(`\rCompleted ${percentage}%`);
    if (!socket.write(data)) {
      fileReadStream.pause();
    }
  });

  socket.on("drain", () => {
    fileReadStream.resume();
  });

  fileReadStream.on("end", async () => {
    await fileHandle.close();
    console.log("\nUploading file finished successfully!");
    socket.end();
  });
});
