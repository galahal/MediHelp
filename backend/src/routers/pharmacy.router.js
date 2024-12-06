import { Router } from "express";

import { PharmacyModel } from "../models/pharmacy.model.js";

const router = Router();

// Get all pharmacies
router.get("/", async (req, res) => {
    try {
        const allPharmacies = await PharmacyModel.find({});
        res.status(200).json({ status: "SUCCESS", allPharmacies });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

// Create a new pharmacy
router.post("/create", async (req, res) => {
    try {
        const newPharmacy = await PharmacyModel.create(req.body);
        res.status(200).json({ status: "SUCCESS", newPharmacy });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

export default router;
