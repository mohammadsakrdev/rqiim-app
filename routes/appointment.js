const express = require("express");
const router = express.Router();
const passport = require("passport");

const appointmentController = require("../controllers/appointment");

// @route   POST api/appointment/makeAppointment
// @desc    Make Appointment
// @access  Public
router.post(
  "/makeAppointment",
  passport.authenticate("jwt", { session: false }),
  appointmentController.makeAppointment
);

// @route   POST api/appointment/requestAppointment
// @desc    Request Appointment
// @access  Public
router.post(
  "/requestAppointment",
  passport.authenticate("jwt", { session: false }),
  appointmentController.requestAppointment
);

// @route   POST api/appointment/rejectAppointment
// @desc    Reject Appointment
// @access  Public
router.post(
  "/rejectAppointment",
  passport.authenticate("jwt", { session: false }),
  appointmentController.rejectAppointment
);

// @route   POST api/appointment/acceptAppointment
// @desc    Accept Appointment
// @access  Public
router.post(
  "/acceptAppointment",
  passport.authenticate("jwt", { session: false }),
  appointmentController.acceptAppointment
);

// @route   POST api/appointment/cancelAppointment
// @desc    Cancel Appointment
// @access  Public
router.post(
  "/cancelAppointment",
  passport.authenticate("jwt", { session: false }),
  appointmentController.cancelAppointment
);

// @route   GET api/appointment/availableAppointments
// @desc    Available Appointment
// @access  Public
router.get(
  "/availableAppointments",
  passport.authenticate("jwt", { session: false }),
  appointmentController.availableAppointments
);

module.exports = router;
