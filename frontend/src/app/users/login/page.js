"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/libs/api";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ trước khi submit
  
    const res = await login(formData);
    console.log("API Response:", res); // Kiểm tra phản hồi API
  
    if (res.success) {
      localStorage.setItem("token", res.token);
      router.push("/boards");
    } else {
      setError(res.message || "Đăng nhập thất bại!");
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Đăng nhập</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} />
          <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
}
