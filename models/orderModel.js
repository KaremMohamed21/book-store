const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cart: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ["accepted", "canceled", "refuesed"],
    default: "accepted"
  },
  totalCost: {
    type: Number,
    required: true
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

orderSchema.pre("save", function (next) {
  if (!this.isModified()) return next();

  this.updatedAt = Date.now();
  next();
});

const Order = model("Order", orderSchema);

module.exports = Order;
