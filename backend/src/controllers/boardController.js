import {Board} from "../models/init-models.js";

/**
 * Tạo một bảng mới
 */

export const createBoard = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Tên bảng không được để trống" });
        }

        const board = await Board.create({ name });

        return res.status(201).json({success:"true", message: "Tạo bảng thành công", board });
    } catch (error) {
        //vừa ad
        console.error("Error stack:", error.stack);
        return res.status(500).json({ message: "Lỗi khi tạo bảng", error: error.message });
    }
};

/**
 * Lấy danh sách tất cả các bảng
 */
export const getAllBoards = async (req, res) => {
    try {
        const boards = await Board.findAll();
        return res.status(200).json({ boards });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách bảng", error: error.message });
    }
};

/**
 * Lấy thông tin chi tiết của một bảng
 */
export const getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await Board.findByPk(id);

        if (!board) {
            return res.status(404).json({ message: "Không tìm thấy bảng" });
        }

        return res.status(200).json({ board });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy bảng", error: error.message });
    }
};

/**
 * Cập nhật thông tin bảng
 */
export const updateBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const board = await Board.findByPk(id);
        if (!board) {
            return res.status(404).json({ message: "Không tìm thấy bảng" });
        }

        board.name = name;
        await board.save();

        return res.status(200).json({success:"true", message: "Cập nhật bảng thành công", board });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật bảng", error: error.message });
    }
};

/**
 * Xóa bảng (soft delete)
 */
export const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;

        const board = await Board.findByPk(id);
        if (!board) {
            return res.status(404).json({ message: "Không tìm thấy bảng" });
        }

        await board.destroy();

        return res.status(200).json({success:"true", message: "Xóa bảng thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa bảng", error: error.message });
    }
};
