// backend/sockets/socketHandler.js
export const handleSocketConnection = (socket) => {
    console.log('New client connected:', socket.id);

    /*socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Client ${socket.id} joined room ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Client ${socket.id} left room ${roomId}`);
    });
    */
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
};
