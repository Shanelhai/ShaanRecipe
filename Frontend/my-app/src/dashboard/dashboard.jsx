import React, { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";
import api from "../api/api";
import "./dashboard.css";
import Account from "../allcomponent/assets/home/account.jpg";
import Footer from "../allcomponent/footer/footer";

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (user) {
    return (
    <>
     <div className="dashboard-container">
          <h1>Dashboard User Information</h1>
          <div className="dashboard-boxes">
            <div className="box box-logo-box">
              <p className="welcome-text">Welcome to {user.name}</p>
              <div className="logo-placeholder">
                <img src={Account} alt="Account Logo" />
              </div>
            </div>
            <div className="box info-box">
              <div className="details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Phone:</strong> {user.phone || "-"}</p>
                <p><strong>City:</strong> {user.city || "-"}</p>
                <p><strong>Address:</strong> {user.address || "-"}</p>
              </div>
              <button onClick={handleLogout} className="btn-dark">Logout</button>
            </div>
          </div>
        </div>
        <Footer/>
    </>
    );
  }

  return (
    <>
      <div className="Dashboard-containerbox">
        <div className="main-container">
          <div className="header-buttons">
            <button className={activeForm === "register" ? "active" : ""} onClick={() => setActiveForm("register")}>Register</button>
            <button className={activeForm === "login" ? "active" : ""} onClick={() => setActiveForm("login")}>Login</button>
          </div>
          <div className="form-container">
            {activeForm === "login" && <Login formKey={Date.now()} onLogin={setUser} />}
            {activeForm === "register" && <Register formKey={Date.now()} onRegister={setUser} />}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;