export class RoomManager {
    public rooms;
    constructor() {
        this.rooms = new Map();
    }

    createRoom = (roomId: string) => {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, new Set());
        }
    }

    joinRoom = (roomId: string, userId: string) => {
        this.createRoom(roomId);
        this.rooms.get(roomId).add(userId);
    }

    leaveRoom = (roomId: string, userId: string) => {
        if (this.rooms.has(roomId)) {
            this.rooms.get(roomId).delete(userId);
            if (this.rooms.get(roomId).size == 0) {
                this.rooms.delete(roomId)
            }
        }
    }
}