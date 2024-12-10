// req.router.js
import express from 'express';
import { ReqMedicineModel } from '../models/req.model.js';

const router = express.Router();

// GET API to fetch available areas
const defaultAreas = [
    "Mohammadpur",
    "Matuail",
    "Saydabad",
    "Shyampur",
    "Mirpur",
    "Uttara",
    "Badda",
    "Mohakhali",
    "Shonir Akhra",
];

router.get('/areas', async (req, res) => {
    try {
        // Static response; replace with dynamic logic if required
        res.status(200).json(defaultAreas);
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ message: 'Failed to fetch areas', error: error.message });
    }
});

// POST API to handle medicine requests
router.post('/request', async (req, res) => {
    try {
        const {
            medicineName,
            genericName,
            strength,
            quantityRequired,
            preferredManufacturer,
            area,
        } = req.body;

        // Validate required fields
        if (!medicineName || !genericName || !strength || !quantityRequired || !area) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        // Create a new request
        const newRequest = new ReqMedicineModel({
            medicineName,
            genericName,
            strength,
            quantityRequired,
            preferredManufacturer,
            area,
        });

        // Save to the database
        await newRequest.save();

        res.status(201).json({
            message: 'Medicine request created successfully',
            request: newRequest,
        });
    } catch (error) {
        console.error('Error while creating medicine request:', error);
        res.status(500).json({
            message: 'Error creating medicine request',
            error: error.message,
        });
    }
});

export default router;
