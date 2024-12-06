import { Router } from "express";

import { UserModel } from "../models/user.model.js";

import pkg from 'jsonwebtoken';
const { jwt } = pkg;

import { BAD_REQUEST } from "../constants/httpStatus.js";

const router = Router();

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = UserModel.find(
        user => user.email === email && user.password === password
    );

    if(user){
        res.send(generateTokenResponse(user));
        return;
    }

    res.status(BAD_REQUEST).send("Username or Password in invalid!")
});

const generateTokenResponse = user => {
    const token = jwt.sign (
        {
            id: user.id,
            email: user.email, 
            isAdmin: user.isAdmin,
        },
        "RandomText",
        {
            expiresIn: "30d",
        }
    );
    return {
        id: user.id,
        email: user.email, 
        name: user.name,
        isAdmin: user.isAdmin,
        address: user.address,
        token,
    }
}
// // Get all users
// router.get("/", async (req, res) => {
//     try {
//         const allUsers = await UserModel.find({});
//         res.status(200).json({ status: "SUCCESS", allUsers });
//     } catch (error) {
//         res.status(500).json({ status: "FAILED", error });
//     }
// });

// // Create a new user
// router.post("/create", async (req, res) => {
//     try {
//         const newUser = await UserModel.create(req.body);
//         res.status(200).json({ status: "SUCCESS", newUser });
//     } catch (error) {
//         res.status(500).json({ status: "FAILED", error });
//     }
// });

export default router;
