// const { validate } = require('../models/user');
const { tokenValidate } = require("../services/authentication");
class Token {
  async authentiate(req, res, next) {
    const bearerHearder = req.headers["authorization"];
    if (typeof bearerHearder != "undefined") {
      try {
        const bearer = bearerHearder.split(" ");
        const Token = bearer[1];
        const decode = await tokenValidate(Token);
        req.user = decode;
        next();
      } catch (error) {
        console.log(e);
        return res.status(404).json({
          message: "Your token is expired.",
        });
        // next();
      }
    } else {
      return res.status(404).json({
        message: `A token is required for authentication.`,
      });
    }
  }
}
module.exports = new Token().authentiate;
