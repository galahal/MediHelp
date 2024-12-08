// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { UserModel } from './models/user.model.js'; // Adjust the paths to your files
// import { PharmacyModel } from './models/pharmacy.model.js';
// import { MedicineModel } from './models/medicine.model.js';

// dotenv.config();

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Connected');
//     insertSampleData();
//   })
//   .catch((err) => console.error('MongoDB Connection Error:', err));

// // Insert Sample Data
// const insertSampleData = async () => {
//   try {
//     // Insert users
//     await UserModel.deleteMany(); // Clear existing data for testing purposes
//     const users = [
//       {
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'password123',
//         address: '123 Main Street, Cityville',
//         phone: "+8801717171717",
//         isAdmin: true,
//       },
//       {
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         password: 'password123',
//         address: '456 Elm Street, Townsville',
//         phone: "+8801717171718",
//         isPharmacist: true,
//       },
//     ];
//     await UserModel.insertMany(users);
//     console.log('Sample Users Inserted');

//     // // Insert pharmacies
//     // await PharmacyModel.deleteMany();
//     // const pharmacies = [
//     //   {
//     //     name: 'City Pharmacy',
//     //     address: '789 Pine Street, Cityville',
//     //     isEmergency: true,
//     //   },
//     //   {
//     //     name: 'Health Hub',
//     //     address: '101 Oak Avenue, Townsville',
//     //   },
//     // ];
//     // await PharmacyModel.insertMany(pharmacies);
//     // console.log('Sample Pharmacies Inserted');

//     // // Insert medicines
//     // await MedicineModel.deleteMany();
//     // const medicines = [
//     //   {
//     //     name: 'Paracetamol',
//     //     price: 5.99,
//     //     tags: ['pain relief', 'fever'],
//     //     imageUrl: 'https://example.com/paracetamol.jpg',
//     //     generics: 'Acetaminophen',
//     //     brand: 'Tylenol',
//     //     expiryDate: new Date('2025-12-31'),
//     //   },
//     //   {
//     //     name: 'Ibuprofen',
//     //     price: 8.99,
//     //     tags: ['pain relief', 'anti-inflammatory'],
//     //     imageUrl: 'https://example.com/ibuprofen.jpg',
//     //     generics: 'Ibuprofen',
//     //     brand: 'Advil',
//     //     expiryDate: new Date('2024-11-30'),
//     //   },
//     // ];
//     // await MedicineModel.insertMany(medicines);
//     // console.log('Sample Medicines Inserted');

//     mongoose.connection.close(); // Close connection after completion
//     console.log('Database Seeded Successfully');
//   } catch (err) {
//     console.error('Error seeding data:', err);
//   }
// };

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './models/user.model.js'; // Adjust paths if necessary

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    insertSampleData();
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Insert Sample Data
const insertSampleData = async () => {
  try {
    await UserModel.deleteMany(); // Clear existing data
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: '123 Main Street, Cityville',
        phone: '+8801717171717',
        isAdmin: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        address: '456 Elm Street, Townsville',
        phone: '+8801717171718',
        isPharmacist: true,
      },
    ];
    await UserModel.insertMany(users);
    console.log('Sample Users Inserted');

    mongoose.connection.close(); // Close the connection
    console.log('Database Seeded Successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
  console.log('MONGO_URI:', process.env.MONGO_URI);

};
