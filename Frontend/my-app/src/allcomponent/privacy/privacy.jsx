import React from "react";
import "./privacy.css";
import Footer from "../footer/footer";

const Privacy = () => {
  return (
   <>
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy <span>Policy</span></h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>TastyNest.in</strong>. We value your privacy and are committed 
            to protecting the personal information you share with us. This page explains how 
            we collect and use your data when you browse our recipes.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect two types of information to provide a better experience:</p>
          <ul>
            <li><strong>Personal Information:</strong> If you contact us via email or contact forms (e.g., Name, Email).</li>
            <li><strong>Log Data:</strong> Technical information such as your IP address, browser type, and the pages you visit on our site.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cookies & Advertising</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements. Google uses 
            cookies to serve ads based on your prior visits to our website or other websites 
            on the internet. You can opt out of personalized advertising by visiting your 
            Google Ad Settings.
          </p>
        </section>

        <section>
          <h2>4. Use of Content</h2>
          <p>
            All recipes provided on TastyNest are for informational purposes. While we strive 
            to provide accurate and delicious recipes, we encourage you to follow safety 
            guidelines while cooking.
          </p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy or our website practices, 
            please feel free to reach out to us at <strong>support@tastynest.in</strong>.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default Privacy;