import React from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile";

const Dashboard = () => {
  const { user, loading } = useAuth();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e8f0fe, #bbdefb)",
      fontFamily: "Segoe UI, sans-serif",
      color: "#333",
      padding: "30px 20px",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px 60px",
      borderRadius: "16px",
      boxShadow: "0 6px 14px rgba(0, 0, 0, 0.1)",
      maxWidth: "480px",
      width: "100%",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "700",
      color: "#1a237e",
      marginBottom: "25px",
    },
    link: {
      display: "inline-block",
      marginTop: "20px",
      color: "#3949ab",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.2s ease",
    },
    loading: {
      fontSize: "1.3rem",
      color: "#555",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>You are not logged in</h2>
          <a href="/" style={styles.link}>
            Go back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>
        <Profile /> {/* 👈 user info + logout button */}
      </div>
    </div>
  );
};

export default Dashboard;
