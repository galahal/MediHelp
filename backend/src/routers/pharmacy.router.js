import { Router } from "express";
import { PharmacyModel } from "../models/pharmacy.model.js";
import { UserModel } from "../models/user.model.js";

const router = Router();

// Define a list of allowed areas (if required)
const allowedAreas = [
    "Mohammadpur", "Matuail", "Saydabad", "Shyampur", "Mirpur (Gram)",
    "Uttara (Gram)", "Badda", "Mohakhali", "Shonir Akhra"
];

// Get all pharmacies
router.get("/", async (req, res) => {
    try {
        const allPharmacies = await PharmacyModel.find({}).populate("pharmacist", "name email");
        res.status(200).json({ status: "SUCCESS", allPharmacies });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error: error.message });
    }
});

// Create a new pharmacy
router.post("/create", async (req, res) => {
    try {
        const { name, address, contact, isEmergency, area, pharmacist } = req.body;

        // Validate pharmacist
        const Pharmacist = await UserModel.findById(pharmacist);
        if (!Pharmacist || !Pharmacist.isPharmacist) {
            return res.status(400).json({ status: "FAILED", message: "Invalid pharmacist ID" });
        }

        // Validate area (optional, if you have predefined areas)
        if (!allowedAreas.includes(area)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid area" });
        }

        // Create pharmacy
        const newPharmacy = new PharmacyModel({
            name,
            address,
            contact,
            isEmergency,
            area,  // Save the area
            pharmacist,
        });

        await newPharmacy.save();

        res.status(201).json({ status: "SUCCESS", newPharmacy });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error: error.message });
    }
});
// Update pharmacy details
router.put("/:id", async (req, res) => {
    try {
        const pharmacyId = req.params.id;
        const updatedData = req.body;

        // Validate area (optional)
        if (updatedData.area && !allowedAreas.includes(updatedData.area)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid area" });
        }

        const updatedPharmacy = await PharmacyModel.findByIdAndUpdate(pharmacyId, updatedData, { new: true });
        if (!updatedPharmacy) {
            return res.status(404).json({ status: "FAILED", message: "Pharmacy not found" });
        }

        res.status(200).json({ status: "SUCCESS", updatedPharmacy });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error: error.message });
    }
});

// Delete a pharmacy
router.delete("/:id", async (req, res) => {
    try {
        const pharmacyId = req.params.id;

        const deletedPharmacy = await PharmacyModel.findByIdAndDelete(pharmacyId);
        if (!deletedPharmacy) {
            return res.status(404).json({ status: "FAILED", message: "Pharmacy not found" });
        }

        res.status(200).json({ status: "SUCCESS", message: "Pharmacy deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error: error.message });
    }
});

export default router;