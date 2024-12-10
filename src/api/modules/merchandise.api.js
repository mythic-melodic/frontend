import Client from "../client.api";

const Merchandise = {
  async getMerchandiseById(id) {
    try {
      const response = await Client.get(`/merchandise/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllMerchandise() {
    try {
      const response = await Client.get("/merchandise/all");
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllMerchandiseByArtistId(id, sort) {
    try {
      const response = await Client.get(`/artist/${id}/merchandise`, {
        params: {sort}
      });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },

  async createMerchandise(data) {
    try {
      const response = await Client.post("/merchandise", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
};
export default Merchandise;
