const express = require("express");
const router = express.Router();
const {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controller/expenseController");

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
