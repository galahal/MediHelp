// import { Router } from "express";

// import { UserModel } from "../models/user.model.js";

// import pkg from 'jsonwebtoken';
// const { jwt } = pkg;

// import { BAD_REQUEST } from "../constants/httpStatus.js";

// const router = Router();

// router.post('/login', (req, res) => {
//     const {email, password} = req.body;
//     const user = UserModel.find(
//         user => user.email === email && user.password === password
//     );

//     if(user){
//         res.send(generateTokenResponse(user));
//         return;
//     }

//     res.status(BAD_REQUEST).send("Username or Password in invalid!")
// });

// const generateTokenResponse = user => {
//     const token = jwt.sign (
//         {
//             id: user.id,
//             email: user.email, 
//             isAdmin: user.isAdmin,
//         },
//         "RandomText",
//         {
//             expiresIn: "30d",
//         }
//     );
//     return {
//         id: user.id,
//         email: user.email, 
//         name: user.name,
//         isAdmin: user.isAdmin,
//         address: user.address,
//         token,
//     }
// }
// // // Get all users
// // router.get("/", async (req, res) => {
// //     try {
// //         const allUsers = await UserModel.find({});
// //         res.status(200).json({ status: "SUCCESS", allUsers });
// //     } catch (error) {
// //         res.status(500).json({ status: "FAILED", error });
// //     }
// // });

// // // Create a new user
// // router.post("/create", async (req, res) => {
// //     try {
// //         const newUser = await UserModel.create(req.body);
// //         res.status(200).json({ status: "SUCCESS", newUser });
// //     } catch (error) {
// //         res.status(500).json({ status: "FAILED", error });
// //     }
// // });

// export default router;

import express from 'express';
import { Router } from "express";
import { UserModel } from '../models/user.model.js';  // Named import
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const { name, address, email, contactNumber, password } = req.body;
        
//         // Check if the user already exists by email
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create a new user with the provided data
//         const newUser = new UserModel({ name, address, email, contactNumber, password });

//         // Save the user to the database
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering user', error });
//     }
// });

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

// Login Route
router.post('/login', async (req, res) => {
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
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET, // Ensure this is set in your .env file
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error during login:", error); // Log the error for debugging
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  });
//   module.exports = router;
export default router;
