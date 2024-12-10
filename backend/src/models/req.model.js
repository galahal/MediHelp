<<<<<<< HEAD
import { model, Schema, Types } from 'mongoose';

const ReqMedicineSchema = new Schema(
  {
    medicineName: {
      type: String,
      required: true,
      
    },
    genericName: {
      type: String,
      required: true,
      
    },
    strength: {
      type: String,
      required: true,
    
    },
    quantityRequired: {
      type: Number,
      required: true,
      min: 1,
    },
    preferredManufacturer: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      enum: [
        "Mohammadpur",
        "Matuail",
        "Saydabad",
        "Shyampur",
        "Mirpur",
        "Uttara",
        "Badda",
        "Mohakhali",
        "Shonir Akhra",
      ],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("RequestedMedicine", ReqMedicineSchema);
export const ReqMedicineModel = model('reqmedicine', ReqMedicineSchema);
=======
import { model, Schema, Types } from 'mongoose';

const ReqMedicineSchema = new Schema(
  {
    medicineName: {
      type: String,
      required: true,
      
    },
    genericName: {
      type: String,
      required: true,
      
    },
    strength: {
      type: String,
      required: true,
    
    },
    quantityRequired: {
      type: Number,
      required: true,
      min: 1,
    },
    preferredManufacturer: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      enum: [
        "Mohammadpur",
        "Matuail",
        "Saydabad",
        "Shyampur",
        "Mirpur",
        "Uttara",
        "Badda",
        "Mohakhali",
        "Shonir Akhra",
      ],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("RequestedMedicine", ReqMedicineSchema);
export const ReqMedicineModel = model('reqmedicine', ReqMedicineSchema);
>>>>>>> d00f961ab7f834ba44f2ee1f078c61d15f36d9fe
