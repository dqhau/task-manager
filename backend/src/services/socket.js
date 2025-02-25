import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Cho phép tất cả các client kết nối
        },
    });

    io.on("connection", (socket) => {
        console.log("⚡ Client connected:", socket.id);

        // Khi có thay đổi trên Board
        socket.on("boardUpdated", (board) => {
            socket.broadcast.emit("boardUpdated", board);
        });

        // Khi có thay đổi trên List
        socket.on("listUpdated", (list) => {
            socket.broadcast.emit("listUpdated", list);
        });

        // Khi có thay đổi trên Card
        socket.on("cardUpdated", (card) => {
            socket.broadcast.emit("cardUpdated", card);
        });

        // Khi một Card được kéo thả giữa các List
        socket.on("cardMoved", (data) => {
            socket.broadcast.emit("cardMoved", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });

    return io;
};

export const getSocketInstance = () => io;
