const Appointment = require("../models/appointment");

exports.makeAppointment = (req, res, next) => {
  if (req.user.isDoctor()) {
    const newAppointment = new Appointment({
      doctorId: req.user,
      patientId: null,
      isCanceled: null,
      isAccepted: null
    });
    newAppointment
      .save()
      .then(appointment =>
        res
          .status(200)
          .json({ message: "Appointment Added", data: appointment })
      )
      .catch(err => console.log(err));
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};

exports.requestAppointment = (req, res, next) => {
  if (req.user.isPatient()) {
    const appointmentId = req.body.appointmentId;
    Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: { patientId: req.user, isAvailable: false }
      },
      { new: true },
      function(err, appointment) {
        if (err) {
          console.log(err);
        }
        return res
          .status(200)
          .json({ message: "Successful", data: appointment });
      }
    );
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};

exports.rejectAppointment = (req, res, next) => {
  if (req.user.isDoctor()) {
    const appointmentId = req.body.appointmentId;
    Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: { isAccepted: false }
      },
      { new: true },
      function(err, appointment) {
        if (err) {
          console.log(err);
        }
        return res
          .status(200)
          .json({ message: "Successful", data: appointment });
      }
    );
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};

exports.acceptAppointment = (req, res, next) => {
  if (req.user.isDoctor()) {
    const appointmentId = req.body.appointmentId;
    Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: { isAccepted: true, isAvailable: false }
      },
      { new: true },
      function(err, appointment) {
        if (err) {
          console.log(err);
        }
        return res
          .status(200)
          .json({ message: "Successful", data: appointment });
      }
    );
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};

exports.cancelAppointment = (req, res, next) => {
  if (req.user.isPatient()) {
    const appointmentId = req.body.appointmentId;
    Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: { isCanceled: false, isAvailable: true, patientId: null }
      },
      { new: true },
      function(err, appointment) {
        if (err) {
          console.log(err);
        }
        return res
          .status(200)
          .json({ message: "Successful", data: appointment });
      }
    );
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};

exports.availableAppointments = (req, res, next) => {
  if (req.user.isPatient()) {
    Appointment.find({ isAvailable: true })
      .then(appointments => {
        return res
          .status(200)
          .json({ message: "Successful", data: appointments });
      })
      .catch(err => console.log(err));
  } else {
    return res.status(403).json({ message: "User is not allowed", data: null });
  }
};
