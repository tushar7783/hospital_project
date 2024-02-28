require("dotenv/config");
const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");
const { tokengeneratorDoctor } = require("../services/authentication");

const DoctorSchema = new Schema(
  {
    DoctorName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    specilization: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      // required: true,f=
      default: "/images/doctor.png",
    },
    role: {
      type: String,
      default: "DOCTOR",
    },
  },
  { timeStamp: true }
);

DoctorSchema.pre("save", function (next) {
  const doctor = this;
  if (!doctor.isModified("password")) return;
  const salt = process.env.SALT;
  const hashpassword = createHmac("sha256", salt)
    .update(doctor.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashpassword;
  next();
});

DoctorSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const doctor = await this.findOne({ email });
    if (!doctor) return `Plaese register yourself`;
    const salt = doctor.salt;
    const userPassword = doctor.password;
    const userProvidePasswordHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (userPassword != userProvidePasswordHash) return `Inavalid password`;
    const token = await tokengeneratorDoctor(doctor);
    return token;
  }
);

const DoctorModel = model("doctor", DoctorSchema);
module.exports = DoctorModel;
