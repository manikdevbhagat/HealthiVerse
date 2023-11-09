// socketService.ts
import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket: Socket;

export function initializeSocket() {
  socket = io(ENDPOINT);
  return socket;
}

export function disconnectSocket(socket: Socket) {
  if (socket) {
    socket.disconnect();
  }
}