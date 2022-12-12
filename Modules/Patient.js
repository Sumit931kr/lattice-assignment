import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    psy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'psy',
      },
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone_number: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Patient = new mongoose.model('Patient', PatientSchema)

export default Patient;


