import axios from 'axios'// Ensure axios is installed (`npm install axios`)

async function testDeleteTrack() {
    const trackId = '123'; // Replace with the actual track ID to delete

    try {
        const response = await axios.delete(`http://localhost:3000/api/v1/track/delete/${trackId}`);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testDeleteTrack();