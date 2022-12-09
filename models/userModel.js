const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const { hash, compare } = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "This is not valid email"]
  },
  phone: {
    type: Number,
    unique: true
  },
  city: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "The password is not the same!"
    }
  },
  image: {
    type: String,
    default: "default.jpg"
  },
  about: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }

  if (this.isModified("password")) {
    this.password = await hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});

userSchema.methods.correctPassword = async function (password, hashedPassword) {
  return await compare(password, hashedPassword);
};

const User = model("User", userSchema);

module.exports = User;
