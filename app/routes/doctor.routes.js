module.exports = app => {
    const doctorController = require("../controllers/doctor.controller");


    // Create a new Doctor
    app.post("/api/auth/doctor" , doctorController.create);
    // Retrieve all Books
    // app.get("/", doctorController.findAll);
};
