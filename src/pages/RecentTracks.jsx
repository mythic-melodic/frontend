import TrackCard from "../components/HomePage/TrackCard";
import { Box, Typography, Stack, CircularProgress, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import TrackAPI from "../api/modules/track.api";  
import LibraryAPI from "../api/modules/library.api";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

const RecentTracks = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const token = useSelector((state) => state.auth.token); // Get the token from the Redux store
    

    // Hàm tải các bài hát mới nhất
    const loadTracks = async (page) => {
        // Tránh gọi API khi đang tải dữ liệu
        if (loading || loadingMore) return;

        try {
            setLoading(page === 1); // Chỉ hiển thị loading lần đầu
            setLoadingMore(page > 1); // Hiển thị loading khi tải thêm

            // Gọi API để lấy bài hát mới nhất
            const response = await LibraryAPI.getRecentTracks(token, page);

            if (response.length > 0) {
                const trackDetails = await Promise.all(response.map(async (track) => {
                    // Gọi TrackAPI để lấy chi tiết cho từng bài hát
                    const trackDetail = await TrackAPI.getTrackById(track.id);
                    return { ...track, detail: trackDetail };
                }));

                setTracks((prevTracks) => [...prevTracks, ...trackDetails]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching tracks:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Hàm xử lý khi nhấn nút "Load More"
    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                loadTracks(nextPage); // Tải thêm bài hát khi nhấn nút
                return nextPage;
            });
        }
    };

    useEffect(() => {
        loadTracks(page);  // Lần đầu tải bài hát khi component mount
    }, [page]);

    return (
        <Box mt={5}>
            {/* Tiêu đề thể loại */}
            <Typography variant="h4" ml={2} sx={{ color: "gray", fontWeight: "bold", paddingLeft: "10px" }}>
                Recent Tracks
            </Typography>

            {/* Danh sách bài hát */}
            <Stack spacing={2} sx={{ marginTop: 2 }} paddingLeft={2}>
                {tracks.map((track) => (
                    <Box key={track.id} sx={{ width: "100%" }}>
                        <TrackCard track={track} /> {/* Pass track detail to TrackCard */}
                    </Box>
                ))}

                {/* Hiển thị trạng thái */}
                {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
                {loadingMore && <Typography variant="body2">Loading more tracks...</Typography>}

                {/* Nút để tải thêm */}
                {!loading && hasMore && (
                    <Button
                        variant="contained"
                        onClick={handleLoadMore}
                        sx={{ alignSelf: "center", marginTop: 2, color: "white", backgroundColor: "darkred" }}
                    >
                        Load More
                    </Button>
                )}
                {/* Thông báo không còn dữ liệu */}
                {!hasMore && page === 1 && <Typography variant="body2" color="red">No tracks found.</Typography>}
                {!hasMore && page > 1 && <Typography variant="body2" color="red">No more tracks to load.</Typography>}
                <Box height={100}></Box>
            </Stack>
        </Box>
    );
};

export default RecentTracks;
