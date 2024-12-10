import Client from "../client.api";

const Artist = {
    async addAlbum(data) {
        if(data) {
            console.log('Data:', data);
        } else {
            console.log('No data received');
        }

        try {
            const response = await Client.post('/artist/add-album', data,  {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getAllAlbums(id) {
        // console.log('Artist ID:', id);
        try {
            const response = await Client.get(`/artist/${id}/albums`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getTopTracks(id) {
        try {
            const response = await Client.get(`/artist/${id}/top-tracks`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getLatestTracks(id) {
        try {
            const response = await Client.get(`/artist/${id}/latest-tracks`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }
    ,

    async getRequestedTracks(id) {
        try {
            const response = await Client.get(`/artist/pending/${id}`);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async approveCollaboration(data) {
        try {
            const response = await Client.put('/artist/approve-track', data);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async rejectCollaboration(data) {
        try {
            const response = await Client.put('/artist/reject-track', data);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
};
export default Artist;