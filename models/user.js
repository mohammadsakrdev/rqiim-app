//User Model
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema Definition

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "patient" }
});

//Pre Save Hook. Used to hash the password
UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  //Generate Salt Value
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //Use this salt value to hash password
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

//Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.isPatient = function() {
  return this.role === "patient";
};

UserSchema.methods.isDoctor = function() {
  return this.role === "doctor";
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
