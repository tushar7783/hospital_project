require("dotenv/config")
const UserModel = require("../models/user");
const DoctorModel = require("../models/doctor");
const AppointmentModel = require("../models/appointment");
const { createHmac } = require("crypto");

exports.signup = async (req, res) => {
  try {
    const { Name, email, password, role } = req.body;
    const create = await UserModel.create({
      Name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "user added sucessfully",
      sucess: true,
      result: create,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Token = await UserModel.matchPasswordAndGenrateToken(email, password);

    res.json({ message: "User login sucessfully", sucess: true, Token: Token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({});
    if (!user) return "no user found";
    res.status(200).json({ message: "all user are", sucess: true, user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};

exports.appointment = async (req, res) => {
  try {
    const { ProblemDesccription, doctorId, dateOfappointment } = req.body;
    const userId = req.user.id;
    // console.log(req.user.id);
    const appointment = await AppointmentModel.create({
      ProblemDesccription: ProblemDesccription,
      doctorId: doctorId,
      userId: userId,
      dateOfappointment: dateOfappointment,
    });
    if (!appointment) return "Something went wrong";
    res.status(201).json({
      message: "appointment booked",
      success: true,
      appointment: appointment,
      // PaitentDetails: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};
exports.search = async (req, res) => {
  // console.log(req.params.key);

  try {
    const result = await DoctorModel.find({
      $or: [
        { specilization: { $regex: req.params.key } },
        { DoctorName: { $regex: req.params.key } },
      ],
    });
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};
exports.isResolved = async (req, res) => {
  try {
    // console.log(req.user.id);

    const update = await AppointmentModel.updateOne(
      { userId: req.user.id },
      { $set: { isResloved: true } }
    );

    res
      .status(200)
      .json({ message: "Patient's issue resolved", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};

exports.test = async (req, res) => {
  res.send("api test");
};

exports.changePassword=async (req,res)=>{
   try {
  //   console.log(req.user.id);
  //   console.log(req.user)
  const email=req.body.email
 const user=await UserModel.findOne({email:email});
 console.log(user);
  const {newPassword,confirmPassword}=req.body;
   if(newPassword!=confirmPassword){
  res.status(400).json({Message:"Password do not match"});
   }
   else{
    const salt = user.salt;
    const hashpassword = createHmac("sha256", salt)
      .update(newPassword)
      .digest("hex");
    
    const update=await UserModel.updateOne({email:email},{$set:{password:hashpassword}})
    console.log(update);
    if(update.acknowledged||update.modifiedCount>0) res.status(200).json({Message:"password updated"})
    
  
  

   }
  



   
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error", error: error });

    
  }
}

exports.profile=async(req,res)=>{
  try {
    // console.log(req.user);
    const user=await UserModel.findById(req.user.id)
    res.status(200).json({Message:"Profile",success:true ,User:user})
    console.log(user);



    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error", error: error });
    
  }
}