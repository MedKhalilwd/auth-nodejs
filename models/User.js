const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      require: true,
      trim: true,
    },
    prenom: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
      trim: true,
    },
    picture: {
      type: String,
      require: true,
    },
  
  
 
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
