import mongoose from "mongoose";

const PsySchema = mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
    },
    Name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Psy = mongoose.model('Psy', PsySchema)

export default Psy


