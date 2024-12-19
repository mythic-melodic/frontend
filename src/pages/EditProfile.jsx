import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs"; // Make sure dayjs is 
import AccountAPI from "../api/modules/account.api.js";
import createURL from "../hooks/createUrl.js";


const EditProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [fileError, setFileError] = useState('');
  const [formData, setFormData] = useState({
    display_name: "",
    username: "",
    bio: "",
    dateOfBirth: null, // Use null for DatePicker compatibility
  });
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user_id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    AccountAPI.getUserProfile(id, token)
      .then((response) => {
        const profile = response[0];
        profile.avatar = createURL(profile.avatar); // Tạo URL cho avatar
        setUserProfile(profile);
        setAvatar(profile.avatar);
        setFormData({
          display_name: profile.display_name || "",
          username: profile.username || "",
          bio: profile.bio || "",
          dateOfBirth: profile.date_of_birth ? dayjs(profile.date_of_birth) : null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: newDate, // The newDate will automatically be a dayjs object
    }));
  };

  const handleSubmit = async () => {
    const data = {
      display_name: formData.display_name,
      username: formData.username,
      bio: formData.bio,
      date_of_birth: formData.dateOfBirth ? formData.dateOfBirth.format("YYYY-MM-DD") : null,
      avatar: avatar,
    };
  
    try {
      const response = await AccountAPI.updateUser(id, data, token);
      console.log("Update user response:", response);
  
      alert("Profile updated successfully!"); // Hiển thị thông báo
      navigate(`/profile/${id}`); // Chuyển hướng sau khi alert đóng
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile. Please try again.");
    }
  };  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      const reader = new FileReader();
    reader.onload = () => {
      setAvatar(file);
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        avatar: reader.result, // Cập nhật trạng thái avatar bằng dữ liệu URL của file
      }));
    };
    reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    setFileError('');
    } else {
      setAvatar(null);
      setFileError('Please upload a valid image file (JPEG, PNG, JPG).');
    }
  };

 


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
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
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
          marginBottom: "1em",
          backgroundColor: userProfile.avatar ? "gray" : "#ccc", // Nếu có ảnh, nền trong suốt
        }}
        src={userProfile.avatar || ""}
        >
        {userProfile.avatar ? "" : "👤"} {/* Hiển thị biểu tượng nếu không có ảnh */}
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
             <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: "#a83232", // Màu nền của nút
          color: "#fff", // Màu chữ
          "&:hover": {
            backgroundColor: "#fffff", // Màu nền khi hover
          },
        }}
      >
        Upload Avatar
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleAvatarChange} // Gọi hàm khi chọn file
        />
      </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "1150px",
          backgroundColor: "rgba(246, 232, 230, 0.78)",
          borderRadius: "10px",
          padding: "2em",
          marginTop: "2em",
        }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Display Name"
            name="display_name"
            value={formData.display_name || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "1em" }}
          />
         
          {/* Date of Birth Picker */}
          <Box sx={{ marginBottom: "1em" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth || null}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{ marginBottom: "5em" }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

          <TextField
            label="Bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            padding="1em"
            sx={{ marginBottom: "1em" }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a83232",
              color: "white",
              "&:hover": { backgroundColor: "#a85555" },
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
