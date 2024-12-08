const net = require("node:net");
const readline = require("node:readline/promises");
const process = require("node:process");

PORT = 4000;
HOST = "localhost";

const readInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const socket = net.createConnection({ port: PORT, host: HOST });

readInterface.on("close", () => {
  socket.destroy();
});

socket.on("connect", async () => {
  console.log("Connected to the server");

  const readMessage = async () => {
    const message = await readInterface.question("Type a message > ");
    //Move the cursor one line up
    await moveCursor(0, -1);
    //Clear the current line
    await clearLine(0);

    socket.write(`${id}-message-${message}`);
  };

  readMessage();

  socket.on("data", async (message) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    const dataString = message.toString("utf-8");
    if (dataString.substring(0, 2) === "id") {
      id = dataString.substring(3);
      console.log(`Your id is ${id}\n`);
    } else {
      console.log(message.toString("utf-8"));
    }

    readMessage();
  });
});

socket.on("end", async () => {
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);
  readInterface.close();
  console.log("Connection was ended!");
});
socket.on("error", (err) => {
  console.log("Error occurred", err.code);
  // readInterface.close();
});
