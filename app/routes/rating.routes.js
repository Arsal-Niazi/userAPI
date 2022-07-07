module.exports = app => {
    const ratingController = require("../controllers/rating.controller");


    // Create a new Doctor
    app.post("/api/auth/doctor", ratingController.create);
    // Retrieve all Books
    // app.get("/", doctorController.findAll);
};
