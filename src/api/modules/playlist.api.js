import Client from "../client.api";
const Playlist = {
    async getPlaylists(id) {
        try {
            const response = await Client.get("/playlist/:id");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getAllPlaylists() {
        try {
            const response = await Client.get("/playlist/all");
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async deletePlaylist(id) {
        try {
            const response = await Client.delete(`/playlist/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async getPlaylistById(id, accessToken) {
        try {
            const response = await Client.get(`/playlist/${id}`, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async getPlaylistByUser(accessToken) {
        try {
            const response = await Client.get("/playlist/creator", {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async createPlaylist(playlist, accessToken) {
        try {
            const response = await Client.post("/playlist/create", playlist, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async updatePlaylist(playlist, accessToken) {
        try {
            const response = await Client.put(`/playlist/${playlist.id}`, playlist, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async getTracksInPlaylist(id, accessToken) {
        try {
            const response = await Client.get(`/playlist/${id}/tracks`, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async addTrackToPlaylist(data, accessToken) {
        try {
            const response = await Client.post(`/playlist/track`, data, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },

    async deleteTrackFromPlaylist(id, track_id, accessToken) {
        try {
            const response = await Client.delete(`/playlist/${id}/track`, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                data: { track_id },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },



}
export default Playlist;

