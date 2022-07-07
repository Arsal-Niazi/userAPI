const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/rating.model");
// console.log(db)
const Rating = db.rating;
const Op = db.Op;

// Create and Save a rating in db
exports.create = async (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.review) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Book
    const rating = {
        apt_id: req.body.apt_id,
        review: req.body.review,
        star: req.body.star,
        // user_id: req.body.user_id,
        user_id: user.id
    };

    console.log(rating)

    Rating.create(rating)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving ratings."
            });
        });
};