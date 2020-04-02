const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const roleEnum = Object.freeze({
  SimpleUser: "SIMPLE",
  TeamLeader: "TEAMLEADER"
});

const userSchema = mongoose.Schema({
  userImage: {
    type: String
  },
  sumonnerName: {
    type: String,

    trim: true
  },
  name: {
    type: String,

    trim: true
  },
  email: {
    type: String,

    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: {
    type: String,

    minLength: 7
  },
  role: {
    type: String,
    enum: Object.values(roleEnum)
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  prename: {
    type: String,

    trim: true
  },
  picture: {
    type: String
  },
  username: {
    type: String,

    trim: true
  },
  isactivated: {
    type: Number,
    default: 1
  }
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
/*userSchema.methods.setIsActivated = async function() {
  // set isactivated to 1 by default
  const user = this;
  const isactivated = 1;
  await user.save();
  return isactivated;
};*/

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};
Object.assign(userSchema.statics, {
  roleEnum
});
const User = mongoose.model("User", userSchema);

module.exports = User;
