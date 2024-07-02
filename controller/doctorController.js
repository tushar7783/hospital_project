const AppointmentModel = require("../models/appointment");
const DoctorModel = require("../models/doctor");
const {createHmac}=require("crypto")
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

exports.changePassword=async(req,res)=>{
  try {
    const email=req.body.email;
    const doc=await DoctorModel.findOne({email:email});
    const {newPassword,confirmPassword}=req.body;
    if(newPassword!=confirmPassword){
      res.status(400).json({Message:"Password do not match"});
    }
    else{
      const salt=doc.salt;
      const hashpassword=createHmac("sha256",salt).update(newPassword).digest("hex")
      const update=await DoctorModel.updateOne({email:email},{$set:{password:hashpassword}})
      if(update.acknowledged||update.modifiedCount>0) res.status(200).json({Message:"password updated"})

    }
    
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server error", error: error });
  }
}

// ***********************************************appoinment *******************************************************************


exports.appointmentList = async (req, res) => {
  try {
    const doctorId = req.user.id;
    // console.log(req.user);
    const list = await AppointmentModel.find({ doctorId, isResloved: false });
    if (!list) return "something went wrong";
    res.status(200).json({
      meassage: "list of appointment",
      success: true,
      list: list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};






exports.testAdmin = async (req, res) => {
  res.send("admin access");
};
exports.testDoctor = async (req, res) => {
  res.send("Doctor access");
};
exports.testUser = async (req, res) => {
  res.send("user access");
};
exports.test = async (req, res) => {
  res.send("testing api");
};
