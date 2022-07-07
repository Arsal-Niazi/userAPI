const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/appointment.model");
// console.log(db)s
const Appointment = db.appointment;
const Op = db.Op;

// Create and Save a new Appointment
exports.create = async (req , res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.appointment_date) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Book
    const appointment = {
        apt_date: req.body.apt_date,
        apt_time: req.body.apt_time,
        status: req.body.status,
        doc_id: req.body.doc.id,
        pat_id: req.body.pat.id
    };

    console.log(appointment)

    Appointment.create(appointment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating appointment."
            });
        });
};