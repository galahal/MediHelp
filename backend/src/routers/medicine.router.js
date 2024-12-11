import { Router } from "express";
import { MedicineModel } from '../models/medicine.model.js';

const router = Router();

// Get all medicines
router.get("/", async (req, res) => {
    try {
        const allMedicines = await MedicineModel.find({});
        res.status(200).json({ status: "SUCCESS", allMedicines });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

// Create a new medicine
router.post("/create", async (req, res) => {
    try {
        const newMedicine = await MedicineModel.create(req.body);
        res.status(200).json({ status: "SUCCESS", newMedicine });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

// Update a medicine by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedMedicine = await MedicineModel.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedMedicine) {
            res.status(200).json({ status: "SUCCESS", updatedMedicine });
        } else {
            res.status(404).json({ status: "FAILED", message: "Medicine not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

// Delete a single medicine by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMedicine = await MedicineModel.findByIdAndDelete(id);
        if (deletedMedicine) {
            res.status(200).json({ status: "SUCCESS", message: "Medicine deleted", deletedMedicine });
        } else {
            res.status(404).json({ status: "FAILED", message: "Medicine not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

// Delete multiple medicines by IDs
router.delete("/", async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ status: "FAILED", message: "Invalid or missing IDs" });
    }

    try {
        const result = await MedicineModel.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ status: "SUCCESS", message: `${result.deletedCount} medicines deleted` });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});

export default router;