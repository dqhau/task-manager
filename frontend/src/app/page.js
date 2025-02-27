"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Task Manager</h1>
        <p className="text-lg text-gray-600 mb-6">Hãy đăng nhập để quản lý công việc của bạn.</p>
        <div className="space-x-4">
          <Button onClick={() => router.push("/users/login")}>Đăng nhập</Button>
          <Button onClick={() => router.push("/users/register")} variant="outline">Đăng ký</Button>
        </div>
      </div>
    </div>
  );
}
