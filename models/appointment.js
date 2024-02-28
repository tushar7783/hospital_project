const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "doctor",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  ProblemDesccription: {
    type: String,
    required: true,
  },
  //  prescriptionImageUrl:{
  //   type: String,
  //       // required: true,f=
  //       default: "/images/doctor.png",
  //  },
  isResloved: {
    type: Boolean,
    default: 0,
  },
});

const AppointmentModel = model("appointment", AppointmentSchema);

module.exports = AppointmentModel;
