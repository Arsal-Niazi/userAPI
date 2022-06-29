const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/schedule.model");
// console.log(db)
const Schedule = db.schedule;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.appointment_date) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Book
    const schedule = {
        appointment_date: req.body.appointment_date,
        home: req.body.home,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        user_id: user.id
    };

    console.log(schedule)

    Schedule.create(schedule)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Schedule."
            });
        });
};