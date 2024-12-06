import { model, Schema } from 'mongoose';

export const DoctorSchema = new Schema(
    {
      name: { type: String, required: true },
      degrees: { type: [String], required: true },
      tags: { type: [String] },
      imageUrl: { type: String, required: true }, 
      specialty: { type: String, required: true }, // e.g., Cardiologist, Neurologist
      experience: { type: Number, required: true }, // Years of experience
      phone: { type: String, required: true }, 
      consultations: { type: Number, default: 0 }, // Number of consultations done
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );
  
  export const DoctorModel = model('doctor', DoctorSchema);