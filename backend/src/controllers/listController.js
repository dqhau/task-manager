import { List,Board } from "../models/init-models.js";


/**
 * Tạo danh sách mới trong bảng
 */
export const createList = async (req, res) => {
    try {
        const { name, board_id } = req.body;
        if (!name || !board_id) {
            return res.status(400).json({ message: "Tên danh sách và boardId là bắt buộc" });
        }

        const board = await Board.findByPk(board_id);
        if (!board) {
            return res.status(404).json({ message: "Bảng không tồn tại" });
        }

        const list = await List.create({ name, board_id });

        return res.status(201).json({success:"true", message: "Tạo danh sách thành công", list });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi tạo danh sách", error: error.message });
    }
};

/**
 * Lấy tất cả danh sách của một bảng
 */
export const getListsByBoard = async (req, res) => {
    try {
        const { board_id } = req.params;
        const lists = await List.findAll({ where: { board_id } });

        return res.status(200).json({ lists });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách", error: error.message });
    }
};

/**
 * Cập nhật danh sách
 */
export const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const list = await List.findByPk(id);
        if (!list) {
            return res.status(404).json({ message: "Danh sách không tồn tại" });
        }

        list.name = name;
        await list.save();

        return res.status(200).json({ message: "Cập nhật danh sách thành công", list });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật danh sách", error: error.message });
    }
};

/**
 * Xóa danh sách (soft delete)
 */
export const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const list = await List.findByPk(id);
        if (!list) {
            return res.status(404).json({ message: "Danh sách không tồn tại" });
        }

        await list.destroy();

        return res.status(200).json({ message: "Xóa danh sách thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa danh sách", error: error.message });
    }
};
