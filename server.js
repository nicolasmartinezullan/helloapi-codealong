const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Vehicle = require("./app/models/vehicle");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up port for server to listen on
const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect("mongodb://localhost:27017/codealong");

// API Routes
const router = express.Router();

// Routes will all be prefixed with /api
app.use("/api", router);

/**
 * MIDDLEWARE -
 * Middleware can be very useful for doing validations. We can log
 * things from here or stop the request from continuing in the event
 * that the request is not safe.
 * middleware to use for all requests
 */

router.use((req, res, next) => {
  next();
});

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to our API!" });
});

router
  .route("/vehicles")

  .post((req, res) => {
    const vehicle = new Vehicle();
    const { make, model, color } = req.body;
    vehicle.make = make;
    vehicle.model = model;
    vehicle.color = color;

    vehicle.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Vehicle was successfully manufactured." });
    });
  })

  .get((req, res) => {
    Vehicle.find((err, vehicles) => {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
  });

router
  .route("/vehicles/:vehicle_id")

  .get((req, res) => {
    Vehicle.findById(req.params.vehicle_id, (err, vehicle) => {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  })

  .delete((req, res) => {
    Vehicle.findById(req.params.vehicle_id).remove(err => {
      if (err) {
        res.send(err);
      }
      res.json({message:'Deleted!!'});
    });
  });

router
  .route("/vehicle/make/:make")

  .get((req, res) => {
    Vehicle.find({ make: req.params.make }, (err, vehicle) => {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router
  .route("/vehicle/color/:color")

  .get((req, res) => {
    Vehicle.find({ color: req.params.color }, (err, vehicle) => {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

// Fire up server
app.listen(port);

console.log(`Server listening on port ${port}.`);
