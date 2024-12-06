import { Router } from "express";
// Test postman vid
import { DoctorModel } from '../models/doctor.model.js';

// Test postman vid
// import {sample_medicine, sample_tag} from "../data.js";

const router = Router();

// router.get('/', (req, res) => {
//     res.send(sample_medicine);
// });

// router.get('/tags', (req, res) => {
//     res.send(sample_mtags);
// });

// router.get('/search/:searchTerm', (req, res) => {
//     const {searchTerm} = req.params;
// });

router.get("/", async (req, res) => {
    try {
        const allDoctors = await DoctorModel.find({});
        res.status(200).json({status: "SUCCESS", allDoctors});
    } catch (error) {
        res.status(500).json({status: "FAILED", error});
    }
});

router.post("/create", async (req, res) => {
    try {
        const newDoctor = await DoctorModel.create(req.body);
        res.status(200).json({status: "SUCCESS", newDoctor});
    } catch (error) {
        res.status(500).json({status: "FAILED", error});
    }
});

export default router;