const API_URL = "http://localhost:5000/api"; 
// Hàm hỗ trợ lấy token từ localStorage
const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
});

// API Users
export async function login(data) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Đăng nhập thất bại!");
    }

    return await res.json(); // Trả về dữ liệu nếu thành công
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function register(data) {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Đăng ký thất bại!");
    }

    return await res.json(); // Trả về dữ liệu nếu thành công
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getProfile() {
  const response = await fetch(`${API_URL}/users/me`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

export async function updateProfile(profileData) {
  const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}

//API Boards
export async function getBoards() {
    try {
      const res = await fetch(`${API_URL}/boards`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return await res.json();
    } catch (error) {
      return { success: false, message: "Lỗi lấy danh sách boards" };
    }
  }
  
  export async function getBoardDetails(boardId) {
    try {
      const res = await fetch(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return await res.json();
    } catch (error) {
      return { success: false, message: "Lỗi lấy thông tin board" };
    }
  }

export async function createBoard(boardData) {
    const response = await fetch(`${API_URL}/boards`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(boardData),
    });
    if (!response.ok) throw new Error("Failed to create board");
    return response.json();
}

export async function updateBoard(boardId, boardData) {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(boardData),
    });
    if (!response.ok) throw new Error("Failed to update board");
    return response.json();
}

export async function deleteBoard(boardId) {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete board");
    return response.json();
}

// 🚀 API Lists
export async function getListsByBoard(boardId) {
    const response = await fetch(`${API_URL}/lists/boards/${boardId}`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error("Failed to fetch lists");
    return response.json();
}

export async function createList(listData) {
    const response = await fetch(`${API_URL}/lists`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(listData),
    });
    if (!response.ok) throw new Error("Failed to create list");
    return response.json();
}

export async function updateList(listId, listData) {
    const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(listData),
    });
    if (!response.ok) throw new Error("Failed to update list");
    return response.json();
}

export async function deleteList(listId) {
    const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete list");
    return response.json();
}

// 🚀 API Cards
export async function getCardsByList(listId) {
    const response = await fetch(`${API_URL}/cards/lists/${listId}`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error("Failed to fetch cards");
    return response.json();
}

export async function createCard(cardData) {
    const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(cardData),
    });
    if (!response.ok) throw new Error("Failed to create card");
    return response.json();
}

export async function updateCard(cardId, cardData) {
    const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(cardData),
    });
    if (!response.ok) throw new Error("Failed to update card");
    return response.json();
}

export async function deleteCard(cardId) {
    const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete card");
    return response.json();
}

export async function moveCard(cardId, destination) {
    const response = await fetch(`${API_URL}/cards/${cardId}/move`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(destination),
    });
    if (!response.ok) throw new Error("Failed to move card");
    return response.json();
}

