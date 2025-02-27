"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/libs/api";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { connectSocket } from "@/libs/socket";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi submit

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    const res = await register({
      email: formData.email,
      name: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    setLoading(false);

    if (res.success) {
      localStorage.setItem("token", res.token);
      connectSocket(res.token); // Kết nối socket ngay khi đăng ký thành công
      router.push("/boards");
    } else {
      setError(res.message || " Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Đăng ký</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField 
            label="Email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Nhập email của bạn"
          />
          <InputField 
            label="Tên người dùng" 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Nhập tên của bạn"
          />
          <InputField 
            label="Mật khẩu" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Nhập mật khẩu"
          />
          <InputField 
            label="Xác nhận mật khẩu" 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Nhập lại mật khẩu"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>
      </div>
    </div>
  );
}
