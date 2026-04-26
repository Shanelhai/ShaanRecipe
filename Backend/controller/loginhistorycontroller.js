import LoginHistory from "../models/loginhistory.js";

export const getLoginHistoryForAdmin = async (req, res) => {
  try {
    const history = await LoginHistory.find()
      .populate({
        path: "user",
        select: "name email role",
        match: { role: "user" } 
      })
      .sort({ createdAt: -1 });

    const filteredHistory = history.filter(h => h.user !== null);

    res.json(filteredHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
