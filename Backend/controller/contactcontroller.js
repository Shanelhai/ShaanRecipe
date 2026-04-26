import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ContactMessage from "../models/contactmessage.js";
import Usermodels from "../models/user.js"; 

dotenv.config();

export const sendContactMessage = async (req, res) => {
  const { name, email, message, userId } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    const newMessage = new ContactMessage({
      name,
      email,
      message,
      userId: userId || null,
    });
    await newMessage.save();
    if (userId) {
      const user = await Usermodels.findById(userId);
      if (user) {
        if (!user.messages) user.messages = [];
        user.messages.push({ message, createdAt: new Date() });
        await user.save();
      }
    }

    res.status(200).json({ message: "Message sent successfully ✅" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ error: "Failed to send message ❌" });
  }
};
