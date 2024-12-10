import express from 'express';
import { Router } from "express";
import { UserModel } from '../models/user.model.js'; // Named import
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, address, email, contact, password } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserModel({ name, address, email, contact, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error to the terminal
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password (direct comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Determine the user role
    const role = user.isAdmin
      ? "Admin"
      : user.isPharmacist
      ? "Pharmacist"
      : user.isDoctor
      ? "Doctor"
      : "Regular";

    // Log the role to the console
    console.log(`User role: ${role}`);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role, // Use the calculated role
      },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role, // Use the calculated role
      },
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error for debugging
    res.status(500).json({ message: "Error during login", error: error.message });
  }
});

router.post('/register', async (req, res) => {
    try {
        const { name, address, email, contactNumber, password } = req.body;
        
        // Check if the user already exists by email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user with the provided data
        const newUser = new UserModel({ name, address, email, contactNumber, password });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
router.get("/", async (req, res) => {
  try {
      const allUsers = await UserModel.find({});
      res.status(200).json({ status: "SUCCESS", allUsers });
  } catch (error) {
      res.status(500).json({ status: "FAILED", error });
  }
});
router.get('/email/:email', async (req, res) => {
  try {
      const { email } = req.params; // Get email from URL parameter

      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ status: "FAILED", message: "User not found" });
      }

      // Respond with user data (excluding password for security)
      res.status(200).json({
          status: "SUCCESS",
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              contactNumber: user.contactNumber,
          },
      });
  } catch (error) {
      console.error("Error fetching user by email:", error);
      res.status(500).json({ status: "FAILED", message: "Internal server error", error: error.message });
  }
});

// Update email API
router.put("/update-email/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameter
    const { newEmail } = req.body; // Get the new email from the request body

    // Validate the new email
    if (!newEmail || typeof newEmail !== "string") {
      return res.status(400).json({ status: "FAILED", message: "Invalid email address" });
    }

    // Check if the new email already exists
    const emailExists = await UserModel.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ status: "FAILED", message: "Email already in use" });
    }

    // Update the user's email
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { email: newEmail },
      { new: true, runValidators: true } // Return updated document and apply schema validation
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "FAILED", message: "User not found" });
    }

    res.status(200).json({ status: "SUCCESS", message: "Email updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error", error: error.message });
  }
});
router.put("/update-password/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameter
    const { oldPassword, newPassword } = req.body; // Get old and new passwords from the request body

    // Validate input
    if (!oldPassword || !newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid input. Password must be at least 6 characters long.",
      });
    }

    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: "FAILED", message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "FAILED", message: "Old password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ status: "SUCCESS", message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error", error: error.message });
  }
});
router.put("/update-address/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameter
    const { newAddress } = req.body; // Get the new address from the request body

    // Validate input
    if (!newAddress || typeof newAddress !== "string" || newAddress.trim().length === 0) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid input. Address must be a non-empty string.",
      });
    }

    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: "FAILED", message: "User not found" });
    }

    // Update the user's address
    user.address = newAddress.trim();
    await user.save();

    res.status(200).json({ status: "SUCCESS", message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error", error: error.message });
  }
});
router.put("/update-contact/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameter
    const { newContact } = req.body; // Get the new contact number from the request body

    // Validate input
    const contactRegex = /^[0-9]{10,15}$/; // Example regex for a valid contact number (10-15 digits)
    if (!newContact || !contactRegex.test(newContact)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid input. Contact number must be 10-15 digits.",
      });
    }

    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: "FAILED", message: "User not found" });
    }

    // Update the user's contact number
    user.contact = newContact.trim();
    await user.save();

    res.status(200).json({ status: "SUCCESS", message: "Contact number updated successfully" });
  } catch (error) {
    console.error("Error updating contact number:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error", error: error.message });
  }
});


export default router;