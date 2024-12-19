import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";
import AccountAPI from "../../src/api/modules/account.api.js";
import createURL from "../hooks/createUrl.js";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user_id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    AccountAPI.getUserProfile(id, token)
      .then((response) => {
        console.log(response[0]);
        setUserProfile(response[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  console.log(userProfile.avatar);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundColor: "#121212",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "2em",
      }}
    >
      {/* Header Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1150px",
          backgroundColor: "black",
          borderRadius: "10px",
          padding: "2em",
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={2}
          direction={{ xs: "column", sm: "row" }} // Breakpoint layout
        >
          {/* Avatar on the Left */}
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              sx={{
                width: 200,
                height: 200,
                backgroundColor: "#ffffff",
                mr: 5,
              }}
              alt="Profile Image"
              src={createURL(userProfile.avatar) || ""}
            >
              🪶
            </Avatar>
          </Grid>

          {/* Text Content on the Right */}
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", sm: "flex-start" }}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {userProfile.display_name || userProfile.username || "unknown"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#bbbbbb" }}>
              @{userProfile.username || "unknown"}
            </Typography>

            {/* Follow Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#121212",
                marginTop: "1em",
                "&:hover": { backgroundColor: "#bbbbbb" },
              }}
              onClick={() => navigate(`/edit-profile/${userProfile.id || ""}`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Date of Birth Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1150px",
          backgroundColor: "#1c1c1c",
          borderRadius: "10px",
          padding: "2em",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          marginTop: "2em",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Date of Birth
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: "1em", fontStyle: "italic", color: "#bbbbbb" }}
        >
          📅{" "}
          {userProfile.date_of_birth
            ? dayjs(userProfile.date_of_birth).format("DD MMMM YYYY")
            : "Not provided"}
        </Typography>
      </Box>

      {/* Bio Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1150px",
          backgroundColor: "#1c1c1c",
          borderRadius: "10px",
          padding: "2em",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          marginTop: "2em",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Bio
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "1em", color: "#bbbbbb" }}>
          {userProfile.bio || "No bio available."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePage;
