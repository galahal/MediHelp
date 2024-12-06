import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { MedicineModel } from '../models/medicine.model.js';
import { PharmacyModel } from '../models/pharmacy.model.js';
import { DoctorModel } from '../models/doctor.model.js';

import bcrypt from 'bcryptjs';


set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('---MongoDB Connected Successfully---');
    } catch (error) {
        console.log(error);        
    }
};

// module.exports = dbconnect;