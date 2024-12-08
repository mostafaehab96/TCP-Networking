# Simple TCP Chat Application

This is a simple TCP chat application that allows multiple clients to connect to a server and exchange messages.

## Usage

1. Start the server:

   ```sh
   node server.js
   ```

2. Start the client:
   ```sh
   node client.js
   ```

## Connecting to the Server

![Server Connection](https://i.imgur.com/pnVa6zV.png)

## Client Interaction

![Client Interaction](https://i.imgur.com/MnGQwUR.png)

## Description

- The server listens for incoming connections on `HOST:PORT`.
- When a client connects, the server assigns a unique ID to the client and notifies all connected clients.
- Clients can send messages to the server, which are then broadcasted to all other clients.
- When a client disconnects, the server notifies all remaining clients.

## Files

- `server.js`: Implements the server-side logic.
- `client.js`: Implements the client-side logic.
