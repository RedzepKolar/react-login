import axios from "axios";

const API_URL = "/api";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        requestBody: {
          username,
          password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.headers["24ca04apr02"];
    if (token) {
      localStorage.setItem("token", token);
    } else {
      console.error("Token not found in the response headers.");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);

    throw error;
  }
};

const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          "24ca04apr02": token,
        },
      }
    );
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export default {
  login,
  logout,
};
