import mongoose from "mongoose";

const HospitalSchmena = mongoose.Schema({
    HospitalName :{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Hospital = mongoose.model('Hospital', HospitalSchmena)

export default Hospital;
