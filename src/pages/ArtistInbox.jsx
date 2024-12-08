import CollaborationRequestCard from "../components/ArtistDashboard/CollaborationRequestCard";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const ArtistInbox = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      track: {
        title: "Track 1",
        cover:
          "https://upload.wikimedia.org/wikipedia/vi/3/35/Ive_-Love_Dive.jpg",
      },
      collaborator: { name: "Collaborator 1" },
      contribution: "Contribution 1",
    },
    {
      id: 2,
      track: {
        title: "Track 2",
        cover:
          "https://upload.wikimedia.org/wikipedia/vi/3/35/Ive_-Love_Dive.jpg",
      },
      collaborator: { name: "Collaborator 2" },
      contribution: "Contribution 2",
    },
  ]);

  //   useEffect(() => {
  //     const fetchRequests = async () => {
  //       const response = await fetch("/api/collaboration-requests");
  //       const data = await response.json();
  //       setRequests(data);
  //     };
  //     fetchRequests();
  //   }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Inbox</Typography>
      {requests.map((request) => (
        <CollaborationRequestCard key={request.id} request={request} />
      ))}
    </Stack>
  );
};

export default ArtistInbox;
