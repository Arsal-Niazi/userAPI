const {verifySignUp} = require("../middlewares/authJwt");
const controller = require("../controllers/auth.controller");

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

    app.get("/api/auth/findAll/doc", controller.findAllDoc);
    app.get("/api/auth/findOne/doc/:id", controller.findOneDoc);
    app.put("/api/auth/updatedoc/:id", controller.updateDoc);

    app.get("/api/auth/findAll/patient", controller.findAllPat);
    app.get("/api/auth/findOne/patient/:id", controller.findOnePat);
};