"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getBoards } from "@/libs/api";
import { connectSocket, getSocket } from "@/libs/socket";
import Button from "@/components/ui/Button";

export default function Homepage() {
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  const hasFetched = useRef(false); // Tránh gọi API nhiều lần

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

      const fetchBoards = async () => {
        try {
          const data = await getBoards(); // data là kết quả đã được parse từ JSON
          console.log("Dữ liệu API:", data);
          
          if (data.success === false) {
            setError(data.message || "Lỗi khi lấy danh sách bảng");
          } else if (data && data.boards && Array.isArray(data.boards)) {
            setBoards(data.boards);
          } else {
            console.error("Định dạng dữ liệu không đúng:", data);
            setError("Định dạng dữ liệu không đúng");
          }
        } catch (error) {
          setError("Đã xảy ra lỗi khi gọi API");
          console.error("Lỗi khi gọi API:", error);
        }
      };

      fetchBoards();

      // Kết nối socket
      connectSocket(localStorage.getItem("token"));
      const socket = getSocket();

      // Lắng nghe sự kiện khi bảng cập nhật
      socket.on("boardUpdated", fetchBoards);

      // Cleanup function để gỡ sự kiện khi component unmount
      return () => {
        socket.off("boardUpdated", fetchBoards);
      };
    }
  }, []); // Chạy 1 lần duy nhất khi component mount

  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <div className="w-1/4 bg-gray-200 p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Danh sách bảng</h2>
        <Button onClick={() => router.push("/boards/create")} className="w-full mb-4">
          + Tạo bảng mới
        </Button>

        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-2">
          {boards.length > 0 ? (
            boards.map((board) => (
              <li 
                key={board.id} 
                className="p-2 bg-white rounded-md shadow cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/boards/${board.id}`)}
              >
                {board.name}
              </li>
            ))
          ) : (
            <p className="text-gray-600">Chưa có bảng nào</p>
          )}
        </ul>
      </div>

      {/* Nội dung chính bên phải */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Chọn một bảng để làm việc</h1>
      </div>
    </div>
  );
}
