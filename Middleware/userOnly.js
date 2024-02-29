const UserModel = require("../models/user");

class User_Auth {
  async RoleCheckUser(req, res, next) {
    const isExist = await UserModel.findById(req.user.id);
    if (!isExist) return res.send({ message: "Please login as user/patient" });
    if (isExist.role == "USER") {
      next();
    } else {
      return res.send({ message: "Please login as Doctor" });
    }
  }
}

module.exports = new User_Auth().RoleCheckUser;
