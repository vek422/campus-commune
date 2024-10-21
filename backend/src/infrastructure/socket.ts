import { Server } from "socket.io"

import { RoomManager } from "@core/usecases/RoomManager"
import { SocketController } from "./api/Controllers/SocketController"

export const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });
    const roomManager = new RoomManager();
    const socketController = new SocketController(roomManager);

    io.on('connection', (socket) => {
        socketController.handleConnection(socket)
        socket.on('disconnect', () => {
            console.log('client disconnected')
        })
    })
} 