require("dotenv/config");
const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");
const { tokengenerator } = require("../services/authentication");

const UserSchema = new Schema(
  {
    Name: {
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
    profileImageUrl: {
      type: String,
      // required: true,f=
      default: "/images/Avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timeStamp: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = process.env.SALT;
  const hashpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashpassword;
  next();
});

UserSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return `Plaese register yourself`;
    const salt = user.salt;
    const userPassword = user.password;
    const userProvidePasswordHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (userPassword != userProvidePasswordHash) return `Inavalid password`;
    const token = await tokengenerator(user);
    return token;
  }
);


const UserModel = model("user", UserSchema);
module.exports = UserModel;
