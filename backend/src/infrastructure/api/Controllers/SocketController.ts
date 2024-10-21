import { RoomManager } from "@core/usecases/RoomManager";
import { Socket } from "socket.io";

export class SocketController {
    public roomManager: RoomManager;
    constructor(roomManager: RoomManager) {
        this.roomManager = roomManager;
    }

    handleConnection = (socket: Socket) => {
        socket.on('joinRoom', (roomId, userId) => {
            this.roomManager.joinRoom(roomId, userId)
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`)
        })
        socket.on('leaveRoom', (roomId, userId) => {
            this.roomManager.leaveRoom(roomId, userId);
            socket.leave(roomId)
        })

        socket.on("new-thread", (roomId, thread) => {
            console.log("Emitting to Room ID : ", roomId)

            socket.to(roomId).emit("new-thread", thread)
        })
        socket.on('message', (roomId, message) => {
            socket.emit('message', { message: message, kya_Re: "kuch nahi" })
        })
    }
}