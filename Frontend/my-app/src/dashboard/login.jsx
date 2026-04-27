import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./both.css";

const Login = ({ formKey }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (formRef.current) formRef.current.reset();
    setFormData({ email: "", password: "" });
    setError("");
    setSuccess("");
  }, [formKey]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://shaanrecipe-1.onrender.com/api/auth/login",
        formData
      );

      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user._id);

        setSuccess("Login successful!");
        setFormData({ email: "", password: "" });

        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-form">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="auth-title">Login</h5>
          <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <div className="d-grid">
              <button type="submit" className="btn-dark">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
