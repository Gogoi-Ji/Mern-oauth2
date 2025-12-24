import React from "react";
import LoginButtons from "../components/LoginButtons";

const Home = () => {
  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      fontFamily: "Segoe UI, sans-serif",
      color: "#333",
      textAlign: "center",
      padding: "20px",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "700",
      color: "#1a237e",
      marginBottom: "0.5rem",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    highlight: {
      color: "#3949ab",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#555",
      marginBottom: "2rem",
      maxWidth: "480px",
    },
    footer: {
      marginTop: "3rem",
      fontSize: "0.9rem",
      color: "#777",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Welcome to <span style={styles.highlight}>MERN OAuth2 Demo</span>
      </h1>
      <p style={styles.subtitle}>
        Securely log in with your favorite social platform and explore your
        personalized dashboard instantly.
      </p>

      <LoginButtons />

      <p style={styles.footer}>© {new Date().getFullYear()} MERN OAuth2 Demo</p>
    </div>
  );
};

export default Home;
