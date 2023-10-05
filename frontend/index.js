const button = document.getElementById("button");
const Name = document.getElementById("name");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const table = document.getElementById("table");
const noItem = document.getElementById("no-item");
const tableBody = document.getElementById("body");

button.addEventListener("click", async (e) => {
  if (Name.value == "" || date.value == "" || amount.value == "") {
    alert("you have to provido the name, amount and date");
    return;
  }

  const response = await fetch("http://localhost:5000/api/v1/expense", {
    method: "POST",
    body: JSON.stringify({
      name: Name.value,
      date: date.value,
      amount: amount.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = response.json();

  Name.value = "";
  date.value = "";
  amount.value = "";
  getExpenses();
});
const getExpenses = async () => {
  const expenses = await fetch("http://localhost:5000/api/v1/expense", {
    method: "GET",
  });

  const json = await expenses.json();
  if (expenses.ok) {
    tableBody.innerHTML = "";
  }
  if (json.length > 0) {
    noItem.setAttribute("class", "item");
  }
  json.map((data) => {
    const newRow = document.createElement("tr");
    const newName = document.createElement("td");
    const newDate = document.createElement("td");
    const newAmount = document.createElement("td");
    const deleteRow = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "remove");
    deleteBtn.setAttribute("id", data._id);

    const deleteValue = document.createTextNode("X");
    deleteBtn.appendChild(deleteValue);
    const date = new Date(data.date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const nameValue = document.createTextNode(data.name);
    const dateValue = document.createTextNode(formattedDate);
    const amountValue = document.createTextNode(data.amount);
    deleteRow.appendChild(deleteBtn);
    newName.appendChild(nameValue);
    newDate.appendChild(dateValue);
    newAmount.appendChild(amountValue);
    newRow.append(newName);
    newRow.append(newDate);
    newRow.append(newAmount);
    newRow.append(deleteRow);

    tableBody.appendChild(newRow);
  });
};

table.addEventListener("click", async (e) => {
  if (e.target.classList.contains("remove")) {
    if (confirm("are you sure you want to remove this expense?")) {
      await fetch("http://localhost:5000/api/v1/expense/" + e.target.id, {
        method: "DELETE",
      });

      const removeRow = e.target.parentNode.parentNode;
      tableBody.removeChild(removeRow);
    }
  }
});
getExpenses();
