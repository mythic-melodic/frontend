import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const CollaborationRequestCard = ({ request }) => {
  return (
    <Paper
      elevation={2}
      sx={{ display: "flex", gap: "1rem", borderRadius: "0.5rem" }}
    >
      <Box component="img" width="10em" height="auto" src={request.track.cover}></Box>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Typography>{request.collaborator.name}</Typography>
        <Typography>{request.track.title}</Typography>
        <Typography>Your contribution: {request.contribution}</Typography>
        <Box display="flex" gap="1rem">
          <Button variant="contained" >
            Accept
          </Button>
          <Button variant="outlined">Decline</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CollaborationRequestCard;
