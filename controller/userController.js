const UserModel = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { Name, email, password } = req.body;
    const create = await UserModel.create({
      Name,
      email,
      password,
    });

    res.status(201).json({
      message: "user added sucessfully",
      sucess: true,
      result: create,
    });
  } catch (error) {
    res.status(500).json({ message: "Inetrnal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Token = await UserModel.matchPasswordAndGenrateToken(email, password);

    res.json({ message: "User login sucessfully", sucess: true, Token: Token });
  } catch (error) {
    res.status(500).json({ message: "Inetrnal server error" });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({});
    if (!user) return "no user found";
    res.status(200).json({ message: "all user are", sucess: true, user: user });
  } catch (error) {
    res.status(500).json({ message: "Inetrnal server error" });
  }
};

exports.test = async (req, res) => {
  res.send("api test");
};
