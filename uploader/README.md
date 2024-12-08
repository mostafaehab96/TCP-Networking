# Simple TCP File Uploader

This is a simple TCP file uploader application that allows clients to upload files to a server in chunks using streams.

## Usage

1. Start the server:

   ```sh
   node server.js
   ```

2. Start the client with the file path to upload:
   ```sh
   node client.js [filepath]
   ```

## Connecting to the Server

![Server Connection](https://i.imgur.com/JpwHppT.png)

## Client Interaction

![Client Interaction](https://i.imgur.com/5b9osSN.png)
![](https://i.imgur.com/HloyvT3.png)

## Description

- The server listens for incoming connections on `HOST:PORT`.
- When a client connects, it sends the filename to the server.
- The server creates a writable stream to save the file in the `storage` directory.
- The client reads the file in chunks and sends the data to the server.
- The server writes the received data to the file.
- When the file transfer is complete, the client closes the connection.

## Files

- `server.js`: Implements the server-side logic.
- `client.js`: Implements the client-side logic.
