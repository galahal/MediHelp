const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.isAdmin
          ? "Admin"
          : user.isPharmacist
          ? "Pharmacist"
          : user.isDoctor
          ? "Doctor"
          : "Regular",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.isAdmin
          ? "Admin"
          : user.isPharmacist
          ? "Pharmacist"
          : user.isDoctor
          ? "Doctor"
          : "Regular",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { login };
