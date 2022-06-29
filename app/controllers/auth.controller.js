const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Doctor = db.doctor;
const Patient = db.patient;
const Schedule = db.schedule;
const Op = db.Op;
const fs = require('fs');
const { query } = require("express");



exports.signup = async (req, res) => {
    // Save user to database
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data  can not be empty!"
        }); 
    }
   
    if (!req.body.email) {
        return res.status(400).send({
            message: "Note email can not be empty"
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Note username can not be empty"
        });
    }


    User.create({
            
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            
            email: req.body.email,
            register_as: req.body.register_as,
            status: req.body.status,
            
            password:  (bcrypt.hashSync(req.body.password))
        })
        .then(user => {
            console.log(user);
            console.log(user.id);
            //Doctor Or Patient check
            if (req.body.register_as === 'Doctor' || req.body.register_as === 'doctor' || req.body.register_as === 'DOCTOR') {
            //Doctor Or Patient check End
            
            //img 1...
            var imgPath = req.body.file1;
            var matches = imgPath.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
                response = {};
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            // console.log("image type", decodedImg, imageBuffer, type);
            //let extension = mime.extension(type);
            let mimeType = type.substring(6);
            console.log("mytype", mimeType);
            let fileName = "image-" + Date.now() + "." + mimeType;
            const filePath = "http://localhost:8081/uploads/images/" + fileName;

            //img 2...
            var imgPath2 = req.body.file2;
            var matches2 = imgPath2.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
                response2 = {};
            if (matches2.length !== 3) {
                return new Error('Invalid input string');
            }
            response2.type = matches2[1];
            response2.data = new Buffer.from(matches2[2], 'base64');
            let decodedImg2 = response2;
            let imageBuffer2 = decodedImg2.data;
            let type2 = decodedImg.type;
            // console.log("image type", decodedImg2, imageBuffer2, type2);
            //let extension = mime.extension(type);
            let mimeType2 = type.substring(6);
            console.log("mytype", mimeType2);
            let fileName2 = "image-" + Date.now() + "." + mimeType2;
            const filePath2 = "http://localhost:8081/uploads/images/" + fileName2;

            console.log('File Path 2 =', filePath2);
            try {
                fs.writeFileSync("./uploads/images/" + fileName, imageBuffer, 'utf8');

                fs.writeFileSync("./uploads/images/" + fileName2, imageBuffer2, 'utf8');

                res.send({
                    "status": "success! New record created successfully",
                    "image_url 1": filePath,
                    "image_url 2": filePath2
                });
            } catch {
                res.send({
                    "status": "Failed!---Some error occoured while uploading"
                })
            }
            //img...end
             const doctor = {
                 mdcn: req.body.mdcn,
                 specialty: req.body.specialty,
                 description: req.body.description,
                 start_date: req.body.start_date,
                 end_date: req.body.end_date,
                 file1: filePath,
                 file2: filePath2,
                 user_id: user.id
             };
               Doctor.create(doctor)
                   .then(data => {
                     res.send({
                         message: "User was registered successfully!"
                     });
                   })
                   .catch(err => {
                       res.status(500).send({
                           message: err.message || "Some error occurred while creating the new doctor."
                       });
                   });
            }else{
                console.log("This LoG for ELSE else Part");
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
                console.log("This LoG for else Part", patient);
                Patient.create(patient)
                    .then(data => {
                        res.send({
                            message: "User was registered successfully!"
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating New Patient"
                        });
                    });
                console.log('Doctor / patient checking else part of code');
            }
            //schedule ...
            const schedule = {
                appointment_date: req.body.appointment_date,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                user_id: user.id
            };
            console.log("This LoG for ELSE else Part", schedule);
            Schedule.create(schedule)
                .then(data => {
                    res.send({
                        message: "User was registered successfully!"
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating New Patient"
                    });
                });
            console.log('Doctor / patient checking else part');

/*
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        id: {
                            [Op.or]: [req.body.roles]
                        }
                    }
                }).then(roles => {
                    console.log(roles);
                    user.setRoles(roles).then(() => {
                        res.send({
                            message: "User was registered successfully!"
                        });
                    });
                });
            } else {
                // User role 1
                user.setRoles([1]).then(() => {
                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            }
*/
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
//Shedule End

//Retrieve all User from db
exports.findAllUser = (req, res) => {
    const firstname = req.query.firstname;
    var condition = firstname ? {
        firstname: {
            [Op.like]: `%${firstname}%`
        }
    } : null;
    User.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//Find User By ID
exports.findOneUser = (req, res) => {
        const id = req.params.id;
        User.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id=" + id
                });
            });
        }

        //Find Doctor By ID
        exports.findOneDoc = (req, res) => {
            const id = req.params.doc_id;
            Doctor.findByPk(id)
                .then(data => {
                    if (data) {
                        res.send(data);
                    } else {
                        res.status(404).send({
                            message: `Cannot find Doctor with id=${id}.`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving Tutorial with id=" + id
                    });
                });
        }


//Retrieve all Doctors from db
exports.findAllDoc = (req, res) => {
    const mdcn = req.query.mdcn;
    var condition = mdcn ? {
        firstname: {
            [Op.like]: `%${mdcn}%`
        }
    } : null;
    Doctor.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving doctors."
            });
        });
};

//Retrieve all Patient from db
exports.findAllPat = (req, res) => {
    const cell = req.query.cell;
    var condition = cell ? {
        firstname: {
            [Op.like]: `%${cell}%`
        }
    } : null;
    Patient.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//Find Patient By ID
exports.findOnePat = (req, res) => {
    const id = req.params.pat_id;
    Patient.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
}

//Update a User by Id
exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};


//Update a Doctor by Id
exports.updateDoc = (req, res) => {
    const id = req.params.doc_id;
    Doctor.update(req.body, {
            where: {
                doc_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Doctor updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Doctor with id=${id}. Maybe Doctor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Doctor with id=" + id
            });
        });
};

//Update a Patient by Id
exports.updatePat = (req, res) => {
    const id = req.params.pat_id;
    Patient.update(req.body, {
            where: {
                pat_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id=" + id
            });
        });
};


//Delete User By ID
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

//Delete Doctor By ID
exports.deleteDoc = (req, res) => {
    const id = req.params.doc_id;
    Doctor.destroy({
            where: {
                doc_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Doctor deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Doctor with id=${id}. Maybe Doctor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Doctor with id=" + id
            });
        });
};

//Delete Patient By ID
exports.deletePat = (req, res) => {
    const id = req.params.pat_id;
    Patient.destroy({
            where: {
                pat_id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Patient deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Patient with id=" + id
            });
        });
};






exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            console.log("user", user);
            if (!user) {
                return res.status(400).send({
                    message: "Email Not found"
                });
            }
            console.log(req.body);
            console.log(bcrypt.hashSync(req.body.password, 8));
             console.log(user.password);
            let passwordIsValid = bcrypt.compareSync(req.body.password , user.password);
            console.log(passwordIsValid);
            if (!passwordIsValid) {
                return res.status(400).send({
                    message: "Invalid Password"
                });
            }

            let token = jwt.sign({
                id: user.id
            }, config.auth.secret, {
                expiresIn: 86400 // 24 hours
            });

            let authorities = "";
            user.getRoles().then(roles => {
                console.log("shell", roles);
                for (let i = 0; i < roles.length; i++) {
                    //    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    authorities = roles[i].name;
                }

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    
                    email: user.email
                    
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};