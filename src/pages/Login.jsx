import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Account from "../api/modules/account.api";
import {
  setToken,
  setRole,
  setUserID,
  setDisplayName,
  setAddress,
  setPhone,
  setBalance,
} from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false); // Thêm trạng thái hover
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    // console.log('Username:', username);
    // console.log('Password:', password);
    const data = {
      username: username,
      password: password,
    };
    Account.login(data).then((response) => {
      if (!response.auth) {
        console.log(response);
        toast.error(response.data);
      } else {
        dispatch(setToken(response.token));
        dispatch(setRole(response.role));
        dispatch(setUserID(response.user_id));
        dispatch(setDisplayName(response.display_name));
        dispatch(setPhone(response.phone));
        dispatch(setAddress(response.address));
        dispatch(setBalance(response.balance));
        if (response.role === "admin") {
          navigate("/admin");
        } else if (response.role === "artist") {
          navigate("/artist");
        } else if (response.role === "order_manager") {
          navigate("/order_manage");
        } else {
          navigate("/");
        }
      }
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginContainer}>
        <h1 style={styles.heading}>Login to Melodic</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            style={
              isHovered
                ? { ...styles.button, ...styles.buttonHover }
                : styles.button
            }
            onMouseEnter={() => setIsHovered(true)} // Thêm sự kiện khi hover
            onMouseLeave={() => setIsHovered(false)} // Thêm sự kiện khi không hover
          >
            Log In
          </button>
        </form>
        <a href="#" style={styles.forgotPassword}>
          Forgot your password?
        </a>
        <p style={styles.loginText}>
          <span style={styles.inlineText}>Don't have an account? </span>
          <Link to="/register" style={styles.link}>
            Sign up for Melodic
          </Link>
        </p>
      </div>
      <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={true}
              transition={Slide}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              closeButton={false}
            />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  loginContainer: {
    width: "350px",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "30px",
    color: "#333",
    marginTop: "40px",
    marginBottom: "40px",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "15px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "40px",
    marginBottom: "40px",
    transition: "background-color 0.3s ease", // Thêm chuyển đổi màu mượt mà
  },
  buttonHover: {
    backgroundColor: "#ff0000", // Màu đỏ tươi khi hover
  },
  forgotPassword: {
    display: "block",
    margin: "10px 0",
    fontSize: "14px",
    color: "#666",
    textDecoration: "none",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: "1.5rem",
    fontSize: "0.875rem",
  },
  inlineText: {
    display: "inline",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    display: "inline",
  },
};

export default Login;
