const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/patient.model");
// console.log(db)
const Patient = db.patient;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.cell) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Book
    const patient = {
            cell: req.body.cell,
            home: req.body.home,
            work: req.body.work,
            preferred_number: req.body.preferred_number,
            address: req.body.address,
            gender: req.body.gender,
            dob: req.body.dob,
            user_id: user.id
    };

    console.log(patient)
    // Create a Book 
    //  Doctor.create = ({
    //   
    // });
    //console.log("ye rha doctor",doctor);
    // Save Book in database
    Patient.create(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Patient."
            });
        });
};