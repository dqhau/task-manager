import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {User} from "../models/init-models.js";
import { getSocketInstance } from "../services/socket.js";

// Đăng ký
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được sử dụng!" });
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng ký!", error });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng!" });
        }

        // Tạo JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Đăng nhập thành công!", token });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng nhập!", error });
    }
};

// Lấy thông tin user
export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin!", error });
    }
};

// Cập nhật thông tin user
export const updateProfile = async (req, res) => {
    const { name, avatar } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }

        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        await user.save();

        // Gửi sự kiện cập nhật user đến client
        const io = getSocketInstance();
        io.emit("userUpdated", { id: user.id, name: user.name, avatar: user.avatar });

        res.status(200).json({ message: "Cập nhật thành công!", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật user!", error });
    }
};
