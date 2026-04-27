import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./both.css";

const Register = ({ formKey }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (formRef.current) formRef.current.reset();
    setFormData({ name: "", email: "", password: "", phone: "", city: "", address: "" });
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
        "https://shaanrecipe-1.onrender.com/api/auth/register",
        formData
      );

      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user._id);

        setSuccess("Registration successful!");
        setFormData({ name: "", email: "", password: "", phone: "", city: "", address: "" });

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
    <>
      <div className="auth-form"> 
    <div className="card shadow"> 
      <div className="card-body">
        <h5 className="auth-title">Register</h5>
        
        <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <div className="register-grid">
            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Create password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="text" name="phone" className="form-control" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="text" name="city" className="form-control" placeholder="Enter city" value={formData.city} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <input type="text" name="address" className="form-control" placeholder="Enter address" value={formData.address} onChange={handleChange} required />
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="d-grid">
            <button type="submit" className="btn-dark">Register</button>
          </div>
        </form>

      </div>
    </div>
  </div>
    </>
  );
};

export default Register;
