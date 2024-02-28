const DoctorModel = require("../models/doctor");
// const { find } = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { DoctorName, email, password, specilization } = req.body;
    const doctor = await DoctorModel.create({
      DoctorName: DoctorName,
      email: email,
      password: password,
      specilization: specilization,
    });
    if (!doctor) return;
    res.status(201).json({
      meassage: "Doctor added sucessfully",
      sucess: true,
      result: doctor,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server error", error: error });
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Token = await DoctorModel.matchPasswordAndGenrateToken(
      email,
      password
    );
    res
      .status(200)
      .json({ meassage: "Doctor login", success: true, Token: Token });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllDoctor = async (req, res) => {
  try {
    const alldoc = await DoctorModel.find({});
    res
      .status(200)
      .json({ message: "ALL doctors", sucess: true, doctors: alldoc });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server error", error: error });
  }
};

exports.test = async (req, res) => {
  res.send("testing api");
};
