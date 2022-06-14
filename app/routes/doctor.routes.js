module.exports = app => {
    const doctorController = require("../controllers/doctor.controller.js");

    const router = require("express").Router();

    // Create a new doctor
    router.post("/", doctorController.create);

    // Retrieve all doctors
    router.get("/", doctorController.findAll);

    // Retrieve all published doctors
    router.get("/published", doctorController.findAllPublished);

    // Retrieve a single doctor with id
    router.get("/:id", doctorController.findOne);

    // Update a doctor with id
    router.put("/:id", doctorController.update);

    // Delete a doctor with id
    router.delete("/:id", doctorController.delete);

    // Delete all doctors
    router.delete("/", doctorController.deleteAll);

    app.use("/api/doctor", router);
};