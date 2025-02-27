// Hàm format danh sách boards
export const formatBoards = (data) => {
    if (!data || !Array.isArray(data.boards)) {
      return [];
    }
  
    return data.boards.map(board => ({
      id: board.id,
      name: board.name.trim(), // Xóa khoảng trắng thừa
    }));
  };
  