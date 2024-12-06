import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// Import routers
import medicineRouter from './routers/medicine.router.js';
import doctorRouter from './routers/doctor.router.js';
import userRouter from './routers/user.router.js';
import pharmacyRouter from './routers/pharmacy.router.js';

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();

app.use(cors({
    credentials:true,
    origin: ['http://localhost:3001']
    })
);

app.use(express.json());

// Register routers
app.use('/api/medicine', medicineRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/pharmacy', pharmacyRouter);

app.get("/", (req, res) => {
    res.status(200).json("API Successfull");
});

// const PORT = 5000;
app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)

})