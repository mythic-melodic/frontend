import Client from "../client.api";

const Order = {
  async createOrderByUserId(data) {
    try {
      const response = await Client.post(`/order/create`, data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return { message: "An error occurred while creating the order." };
      }
    }
  },
  async addToOrderMerchandise(data) {
    try {
      const response = await Client.post(`/order/add`, data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while adding merchandise to the order.",
        };
      }
    }
  },
  async getAllOrderByUserId(userId) {
    try {
      const response = await Client.get(`/order/all/${userId}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving orders for the user.",
        };
      }
    }
  },
  async getOrderDetail(orderId) {
    try {
      const response = await Client.get(`/order/${orderId}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving order details.",
        };
      }
    }
  },
  async updateStatus(orderId, status) {
    try {
      const response = await Client.put(`/order/update-status/${orderId}`, {
        status: status,
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while updating the order status.",
        };
      }
    }
  },
  async getAllOrder() {
    try {
      const response = await Client.get(`/order/all`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          message: "An error occurred while retrieving all orders.",
        };
      }
    }
  },
};
export default Order;
