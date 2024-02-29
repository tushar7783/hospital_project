const DoctorModel = require("../models/doctor");

class Doctor_Auth {
  async RoleCheckDoctor(req, res, next) {
    const isExist = await DoctorModel.findById(req.user.id);
    if (!isExist) return res.send({ message: "Please login as Doctor" });
    if ((isExist.role = "DOCTOR")) {
      next();
    } else {
      return res.send({ message: "Please login as Doctor" });
    }
  }
}

module.exports = new Doctor_Auth().RoleCheckDoctor;
