const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = mongoose.Schema({
  appointmentDate: { type: Date, default: Date.now },
  doctorId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  patientId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  isAvailable: { type: Boolean, default: true },
  isCanceled: { type: Boolean, default: null },
  isAccepted: { type: Boolean, default: null }
});

const Task = mongoose.model("Appointment", AppointmentSchema);

module.exports = Task;
