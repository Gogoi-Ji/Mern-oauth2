import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginButtons = () => {
  const backendUrl = "http://localhost:5000/api/auth";

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${backendUrl}/facebook`;
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "260px",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    googleBtn: {
      backgroundColor: "#fff",
      color: "#333",
      border: "1px solid #ddd",
    },
    facebookBtn: {
      backgroundColor: "#1877f2",
      color: "#fff",
    },
    icon: {
      fontSize: "22px",
    },
  };

  // ✅ Inline hover effects via event handlers
  const handleHover = (e, bg) => (e.target.style.backgroundColor = bg);
  const handleReset = (e, bg) => (e.target.style.backgroundColor = bg);

  return (
    <div style={styles.container}>
      <button
        onClick={handleGoogleLogin}
        style={{ ...styles.button, ...styles.googleBtn }}
        onMouseEnter={(e) => handleHover(e, "#f5f5f5")}
        onMouseLeave={(e) => handleReset(e, "#fff")}
      >
        <FcGoogle style={styles.icon} />
        Continue with Google
      </button>

      <button
        onClick={handleFacebookLogin}
        style={{ ...styles.button, ...styles.facebookBtn }}
        onMouseEnter={(e) => handleHover(e, "#0f6de0")}
        onMouseLeave={(e) => handleReset(e, "#1877f2")}
      >
        <FaFacebook style={styles.icon} />
        Continue with Facebook
      </button>
    </div>
  );
};

export default LoginButtons;
