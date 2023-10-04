const Expense = require("../model/expense");
const mongoose = require("mongoose");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
  }
};
const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(401).json({ message: "the specified expense does not exist" });
      return;
    }
    const expense = await Expense.findById(id);
    res.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(401).json({ message: "the specified expense does not exist" });
      return;
    }
    const expense = await Expense.findOneAndDelete({ _id: id });
    res.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
  }
};
const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getExpenses,
  getExpense,
  deleteExpense,
  createExpense,
};
