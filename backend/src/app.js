import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./config/database.js";
import routes from "./routes/index.js";
import { initSocket } from "./services/socket.js";

dotenv.config(); // Load biến môi trường từ .env

const app = express();
const server = createServer(app);

// Cấu hình CORS
app.use(
  cors({
    origin: "*", // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Middleware để parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware để parse URL-encoded data

// Kết nối cơ sở dữ liệu với Sequelize
sequelize
  .sync()
  .then(() => console.log("Kết nối MySQL thành công!"))
  .catch((err) => console.error("Lỗi kết nối MySQL:", err));

// Khởi tạo WebSocket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
initSocket(io); // Gọi hàm khởi tạo socket

// Sử dụng API Routes
app.use("/api", routes);

// Route kiểm tra server
app.get("/", (req, res) => {
  res.send("API Task Manager đang chạy!");
});

// Lắng nghe server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});

export { io };
