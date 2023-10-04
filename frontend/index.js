const button = document.getElementById("button");
const Name = document.getElementById("name");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const table = document.getElementById("table");
const noItem = document.getElementById("no-item");
const tableBody = document.getElementById("body");
const expenseArray = [];

button.addEventListener("click", (e) => {
  if (Name.value == "" || date.value == "" || amount.value == "") {
    alert("you have to provido the name, amount and date");
    return;
  }
  const newRow = document.createElement("tr");
  const newName = document.createElement("td");
  const newDate = document.createElement("td");
  const newAmount = document.createElement("td");
  const deleteRow = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "remove");

  const deleteValue = document.createTextNode("X");
  deleteBtn.appendChild(deleteValue);
  const nameValue = document.createTextNode(Name.value);
  const dateValue = document.createTextNode(date.value);
  const amountValue = document.createTextNode(amount.value);
  deleteRow.appendChild(deleteBtn);
  newName.appendChild(nameValue);
  newDate.appendChild(dateValue);
  newAmount.appendChild(amountValue);
  newRow.append(newName);
  newRow.append(newDate);
  newRow.append(newAmount);
  newRow.append(deleteRow);

  tableBody.appendChild(newRow);
  expenseArray.push(newRow);
  if (expenseArray.length != 0) {
    noItem.className = "item";
  } else {
    noItem.removeAttribute("class", "item");
  }

  Name.value = "";
  date.value = "";
  amount.value = "";
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    if (confirm("are you sure you want to remove this expense?")) {
      const removeRow = e.target.parentNode.parentNode;
      tableBody.removeChild(removeRow);
    }
  }
  expenseArray.pop();
  if (expenseArray.length != 0) {
    noItem.className = "item";
  } else {
    noItem.removeAttribute("class", "item");
  }
});
