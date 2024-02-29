const UserModel = require("../models/user");

class Admin_auth {
  async RoleCheckAdmin(req, res, next) {
    // let id = req.user.id;
    const isExist = await UserModel.findById(req.user.id);
    // console.log(isExist);
    if (!isExist) return res.send({ message: "Please login as admin" });
    if (isExist.role == "ADMIN") {
      next();
    } else {
      return res.send({ message: "Please login as admin" });
    }
  }
}

module.exports = new Admin_auth().RoleCheckAdmin;
