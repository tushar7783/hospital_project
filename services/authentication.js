var jwt = require("jsonwebtoken");
const secrete = process.env.SECRETE_KEY;

const tokengenerator = async (user) => {
  const payload = {
    email: user.email,
    id: user._id,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
  };

  const token = jwt.sign(payload, secrete, {
    expiresIn: "365d",
  });
  return token;
};
const tokengeneratorDoctor = async (user) => {
  const payload = {
    email: user.email,
    id: user._id,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    specilization: user.specilization,
  };

  const token = jwt.sign(payload, secrete, {
    expiresIn: "365d",
  });
  return token;
};

const tokenValidate = async (token) => {
  const payload = jwt.verify(token, secrete);
  return payload;
};

module.exports = { tokengenerator, tokenValidate, tokengeneratorDoctor };
