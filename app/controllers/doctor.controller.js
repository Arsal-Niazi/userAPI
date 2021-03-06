const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/doctor.model");
// console.log(db)
const Doctor = db.doctor;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.mdcn) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Book
    const doctor = {
        mdcn: req.body.mdcn,
        specialty: req.body.specialty,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        file1:req.body.file1,
        file2: req.body.file2,
        user_id:req.body.user_id
    };

console.log(doctor)
    // Create a Book 
    //  Doctor.create = ({
    //   
    // });
    //console.log("ye rha doctor",doctor);
    // Save Book in database
    Doctor.create(doctor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};