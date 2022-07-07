const {verifySignUp} = require("../middlewares/authJwt");
const controller = require("../controllers/auth.controller");
const aptController = require("../controllers/appointment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post(
        "/api/auth/signup",
        // [
        //     verifySignUp.checkDuplicateUsernameOrEmail,
        //     verifySignUp.checkRolesExisted
        // ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
    // app.get("/api/auth/doctor", controller.findAll);
    
    //Users
    app.get("/api/auth/findAll/user", controller.findAllUser);
    app.get("/api/auth/findOne/:id", controller.findOneUser);
    app.put("/api/auth/updateuser/:id", controller.updateUser);
    app.delete("/api/auth/delete/user/:id" , controller.deleteUser)
    
    //doctor
    app.get("/api/auth/findAll/doc", controller.findAllDoc);
    app.get("/api/auth/findOne/doc/:doc_id", controller.findOneDoc);
    app.put("/api/auth/updatedoc/:doc_id", controller.updateDoc);
    app.delete("/api/auth/delete/doctor/:doc_id", controller.deleteDoc);
    
    //patient
    app.get("/api/auth/findAll/patient", controller.findAllPat);
    app.get("/api/auth/findOne/patient/:pat_id", controller.findOnePat);
    app.put("/api/auth/update/patient/:pat_id", controller.updatePat);
    app.delete("/api/auth/delete/patient/:pat_id", controller.deletePat);
    
    //Available Schedule appointments
    app.get("/api/auth/appointments", controller.appointments);
    app.get("/api/auth/appointments/:user_id", controller.appointmentById);

    //Save Appointments
    app.post("/api/auth/appointments/save", controller.createApt);

    //Save Ratings
    app.post("/api/auth/rating/save", controller.createRatings);
    app.get("/api/auth/ratings", controller.findAllRatings);
};