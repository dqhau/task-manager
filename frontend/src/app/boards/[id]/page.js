"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBoardDetails } from "@/libs/api";
import { connectSocket, getSocket } from "@/libs/socket";

export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await getBoardDetails(id);
        setBoard(res.data);
    };

    fetchBoard();
    connectSocket(localStorage.getItem("token"));

    const socket = getSocket();
    socket.on("boardUpdated", fetchBoard); // Lắng nghe sự kiện cập nhật board

    return () => {
      socket.off("boardUpdated", fetchBoard);
    };
  }, [id]);

  if (!board) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{board.name}</h1>
      <div className="flex gap-4">
        {board.lists.map((list) => (
          <div key={list.id} className="bg-gray-100 p-4 rounded-md w-64">
            <h2 className="font-semibold mb-2">{list.name}</h2>
            {list.cards.map((card) => (
              <div key={card.id} className="bg-white p-2 mb-2 rounded-md shadow">
                {card.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
