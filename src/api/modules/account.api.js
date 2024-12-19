import Client from "../client.api";

const Account = {
  async login(data) {
    try {
      const response = await Client.post("/account/login", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async signUp(data) {
    try {
      const response = await Client.post("/account/register", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllUsers() {
    try {
      const response = await Client.get("/account/all");
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async deleteUser(id) {
    try {
      const response = await Client.delete(`/account/delete/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getUserById(id) {
    try {
      const response = await Client.get(`/account/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async updateBalance(userId, data) {
    try {
      const response = await Client.put(
        `/account/update-balance/${userId}`,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("Failed to update balance: " + error.message);
    }
  },
  async addToBalance(userId, data) {
    try {
      const response = await Client.put(
        `/account/add-to-balance/${userId}`,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("Failed to update balance: " + error.message);
    }
  },
};
export default Account;
