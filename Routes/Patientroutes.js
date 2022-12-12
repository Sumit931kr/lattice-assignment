import express from "express";
import Patient from "../Modules/Patient.js";
import Psy from '../Modules/Psy.js'
import Hospital from "../Modules/Hospital.js";

import { body, validationResult } from 'express-validator'


const router = express.Router();

// Creating the APIs

// ADDINg new Patient in the database

router.post('/adding/newPatient:id', [
    body('Address', 'Enter the Valid Address length of 10').isLength({ min: 10 }),
    body('Email', 'Enter the Valid email').isEmail(),
    body('Password', 'must contain one upper character, one lower character and a number. Max length 15 and min length 8').isStrongPassword(),
    body('Phone_number', 'should be at least 10 number + country code').isMobilePhone(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { Name, Address, Email, Phone_number, Password, Photo } = req.body

        const newPatient = await Patient.create({
            Name, Address, Email, Phone_number, Password, Photo, psy: req.params.id
        });

        res.status(200).json({ newPatient });

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


// Adding new Psy into database

router.post('/adding/newPsy/:id', async (req, res) => {

    try {
        const { Name } = req.body

        const newPsy = await Psy.create({
            Name, hospital: req.params.id
        });

        res.status(200).json({ newPsy });

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


router.post('/adding/newHospital', async (req, res) => {

    try {
        const { HospitalName } = req.body

        const newHospital = await Hospital.create({
            HospitalName
        });

        res.status(200).json({ newHospital });

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})




router.get('/detail:id', async (req, res) => {
    // res.json({"msg":"bye"})
    try {

        const hospital = await Hospital.findById(req.params.id)

        const psy = await Psy.find({ hospital: req.params.id });
        const totalpsy = psy.length

        var PatientCount = 0;

        var psyDetail = []
        for (let i = 0; i < psy.length; i++) {

            const patient = await Patient.find({ psy: psy[i].id })
            psyDetail[i] = {
                "id": psy[i].id,
                "Name": psy[i].Name,
                "Patients count": patient.length
            }
            PatientCount = PatientCount + patient.length

        }


        //    console.log(psyDetail);
        //    console.log(PatientCount);


        // res.status(200).json({ psy })
        res.status(200).json({
            "Hospital Name": hospital.HospitalName,
            "Total Psychiatrist count": totalpsy,
            "Total patients count": PatientCount,
            "Psychiatrist Details": psyDetail
        })


    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
})



export default router;
