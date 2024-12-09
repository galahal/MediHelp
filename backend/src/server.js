// // import dotenv from 'dotenv';
// // dotenv.config();
// // import express from 'express';
// // import cors from 'cors';
// // // Import routers
// // import medicineRouter from './routers/medicine.router.js';
// // import doctorRouter from './routers/doctor.router.js';
// // import userRouter from './routers/user.router.js';
// // import pharmacyRouter from './routers/pharmacy.router.js';
// // import { dbconnect } from './config/database.config.js';

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRouter from './routers/user.router.js'; // Import the user router
// import { dbconnect } from './config/database.config.js';

// dotenv.config();
// dbconnect();

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// // Middleware
// app.use(cors({
//     origin: '*', // Frontend URL
//     credentials: true, // If you're sending cookies or session data
// }));


// app.use(express.json()); // To parse incoming JSON requests

// // Register routes
// app.use('/api/user', userRouter); // Register the user router for /api/user routes

// app.get('/', (req, res) => {
//     res.status(200).json('API is working');
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "./config/database.config.js";

// Import routers
import userRouter from "./routers/user.router.js";
import pharmacyRouter from "./routers/pharmacy.router.js";

dotenv.config();
dbconnect();

const app = express();

// Middleware
app.use(cors({
    origin: "*", // Allow all origins for now (can be restricted later)
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded data

// Register routes
app.use("/api/user", userRouter);
app.use("/api/pharmacy", pharmacyRouter);

// Test route
app.get("/", (req, res) => {
    res.status(200).json("API is working");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
