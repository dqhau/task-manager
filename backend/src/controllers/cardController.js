import { Card, List } from "../models/init-models.js";
import { getSocketInstance } from "../services/socket.js";
/**
 * Tạo thẻ mới
 */
export const createCard = async (req, res) => {
    try {
        const { list_id, title, description, dueDate, position } = req.body;
        if (!list_id || !title) {
            return res.status(400).json({ message: "list_id và title là bắt buộc" });
        }

        const list = await List.findByPk(list_id);
        if (!list) {
            return res.status(404).json({ message: "Danh sách không tồn tại" });
        }

        const card = await Card.create({
            list_id,
            title,
            description,
            dueDate,
            position,
        });

        return res.status(201).json({ message: "Tạo thẻ thành công", card });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi tạo thẻ", error: error.message });
    }
};

/**
 * Lấy tất cả thẻ trong một danh sách
 */
export const getCardsByList = async (req, res) => {
    try {
        const { list_id } = req.params;
        const cards = await Card.findAll({ where: { list_id }, order: [["position", "ASC"]] });

        return res.status(200).json({ cards });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách thẻ", error: error.message });
    }
};

/**
 * Cập nhật thông tin thẻ
 */
export const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, position } = req.body;

        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ message: "Thẻ không tồn tại" });
        }

        card.title = title ?? card.title;
        card.description = description ?? card.description;
        card.dueDate = dueDate ?? card.dueDate;
        card.position = position ?? card.position;
        await card.save();

        return res.status(200).json({ message: "Cập nhật thẻ thành công", card });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật thẻ", error: error.message });
    }
};

/**
 * Xóa thẻ (soft delete)
 */
export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findByPk(id);
        if (!card) {
            return res.status(404).json({ message: "Thẻ không tồn tại" });
        }

        await card.destroy();

        return res.status(200).json({ message: "Xóa thẻ thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi xóa thẻ", error: error.message });
    }
};

/**
 * Kéo thả thẻ giữa các danh sách
 */
export const moveCard = async (req, res) => {
    const { cardId, fromlist_id, tolist_id, newPosition } = req.body;

    try {
        // Cập nhật vị trí của Card trong database
        await Card.update(
            { list_id: tolist_id, position: newPosition },
            { where: { id: cardId } }
        );

        // Gửi sự kiện real-time đến client
        const io = getSocketInstance();
        io.emit("cardMoved", { cardId, fromlist_id, tolist_id, newPosition });

        res.status(200).json({ message: "Di chuyển thẻ thành công" });
    } catch (error) {
        res.status(500).json({ error: "Di chuyển thẻ thất bại" });
    }
};