"use client";
import { useState } from "react";

export default function InputField({ 
  label, 
  type, 
  name, 
  value,
  onChange, 
  placeholder = "", 
  error = "" 
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200
            ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      {/* Hiển thị thông báo lỗi */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
