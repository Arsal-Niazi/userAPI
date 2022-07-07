module.exports = app => {
    const appointmentController = require("../controllers/appointment.controller");


    // Create a new Doctor
    app.post("/api/auth/doctor", appointmentController.create);
    // Retrieve all Books
    // app.get("/", doctorController.findAll);
};
