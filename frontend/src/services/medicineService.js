// import { sample_medicines } from "../data";

// export const getAll = async () => sample_medicines;

// import { MedicineModel } from '../../../backend/src/models/medicine.model.js'; // Import your Medicine model

// export const getAll = async () => {
//   try {
//     // Fetch all medicines from the database
//     const medicines = await MedicineModel.find({});
//     return medicines;
//   } catch (error) {
//     console.error('Error fetching medicines:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/medicine';

export const getAll = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched medicines:', response.data.allMedicines); // Debugging log
    return response.data.allMedicines; // Extract the medicines array
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};
