// socketService.ts
import { io, Socket } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_ENDPOINT;
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