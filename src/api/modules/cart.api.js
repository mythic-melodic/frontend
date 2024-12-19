import Client from "../client.api";

const Cart = {
    async getCartById(id) {
        try {
          const response = await Client.get(`/cart/${id}`);
          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response;
          }
        }
    },

    async updateQuantity(data) {
        try {
          const response = await Client.put(`/cart/update`,data);
          return response;
        } catch (error) {
          if (error.response) {
            return error.response;
          } else {
            console.error("Error:", error.message);
            throw error;
          }
        }
    },

    async deleteItem(userId, merchandiseId) {
      try {
          const response = await Client.delete(`/cart/delete`, {
              data: { userId, merchandiseId },
          });
          return response;
      } catch (error) {
          if (error.response) {
              return error.response;
          } else {
              console.error("Error:", error.message);
              throw error;
          }
      }
  },
  async addToCart(data) {
    try {
        const response = await Client.post(`/cart/add`, data);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            console.error("Error:", error.message);
            throw error;
        }
    }
  },

}
export default Cart;