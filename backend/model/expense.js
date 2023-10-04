const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      requied: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expense", expenseSchema);
