
//Server
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const config = require("./app/config/config");
const buffer = require("buffer");
const fs = require('fs');

const homeRoutes = require('./app/routes/home-routes');
const loginRoutes = require('./app/routes/login-routes');

// database
const db = require("./app/models");
const app = express();

app.use(homeRoutes.routes);
app.use(loginRoutes.routes);

app.use(expressLayouts);
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname , 'public')));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Hi there, welcome to this tutorial."
    });
});

// api routes
require("./app/routes/doctor.routes")(app);
require("./app/routes/patient.routes")(app);
require("./app/routes/schedule.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/rating.routes")(app);
// require("./app/routes/sensordata.routes.js")(app);
// require("./app/routes/people.routes.js")(app);
// require("./app/routes/project.routes.js")(app);
// require("./app/routes/sensor.routes.js")(app);
require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

// set port, listen for requests


const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});