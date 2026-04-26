import React, { useState } from "react";
import './contact.css';
import Footer from "../footer/footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5007/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to send message ❌");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Is the server running? ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div className="contact-page-wrapper">
      {/* 📢 Top Banner Ad */}
      <div className="contact-main-container">
        <div className="contact-header-simple">
          <h1>Contact <span>TastyNest</span></h1>
          <p>Have a question or feedback? We’d love to hear from you. Fill out the form below.</p>
        </div>

        <div className="contact-flex-layout">
          
          {/* 📝 LEFT: Clean Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-row">
                <div className="input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>How can we help?</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="6" 
                  placeholder="Write your message here..." 
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn-glow" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {successMsg && <p className="status-msg success">{successMsg}</p>}
              {errorMsg && <p className="status-msg error">{errorMsg}</p>}
            </form>
          </div>

          {/* 📢 RIGHT: Sidebar Ad & Socials */}

        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
}

export default Contact;