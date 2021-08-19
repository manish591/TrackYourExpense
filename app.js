const totalExpense = document.querySelector(".totalexpense");
const inputAmountSpend = document.querySelector(".amountspend");
const inputAmountDescription = document.querySelector(".amountspenton");
const addButton = document.querySelector(".addtolist");
const expenseListInView = document.querySelector(".expenselist");
const deleteButton = document.querySelector('.delete');

// localStorage.clear();

let valueInView = 0;
let expenseArray = JSON.parse(localStorage.getItem("list")) || [];
const options = {year: 'numeric', month: 'long', day: 'numeric' };

addButton.addEventListener("click", addExpensesToTheList);

function addExpensesToTheList() {
  let expenseObj = {};
  let amount = Number(inputAmountSpend.value);
  let amountDescription = inputAmountDescription.value;

  if (inputAmountSpend.value === '' || inputAmountDescription.value === '') {
    return console.log('Please input!')
  } else if (Number(inputAmountSpend.value) < 1) {
      return console.log('Please input a valid value!');
  }

  expenseObj.amount = amount;
  expenseObj.description = amountDescription;
  expenseObj.moment = new Date();
  expenseObj.id = new Date().getTime();

  expenseArray.push(expenseObj);

  renderItems(expenseArray);

  updateTotalValue(amount, totalExpense);
  window.localStorage.setItem('list', JSON.stringify(expenseArray));
}

function createExpenseLists(rupees, name, period) {
    return `
      <div class="list">
        <div class="listtitle">
          <p class="name">${name}</p>
          <span class="date">${period}</span>
        </div>
        <div class="other">
          <strong>${rupees}</strong>
          <button class="delete" onclick="deleteItemFromList(${period})">X</button>
        </div>
      </div>`;
}

function updateTotalValue(amountGiven, total) {
    valueInView = valueInView + amountGiven;
    total.innerText = `${valueInView}`
}

function renderItems(arr) {
  let arrayListItems = arr.map(item => createExpenseLists(item.amount, item.description, item.id))
  let joinedList = arrayListItems.join("");
  expenseListInView.innerHTML = joinedList;
}

function deleteItemFromList(dateValue) {
  for(let i = 0; i < expenseArray.length; i++) {
    if(expenseArray[i].id === dateValue) {
      valueInView = valueInView - expenseArray[i].amount;
      totalExpense.innerText = `${valueInView}`;
      expenseArray.splice(i, 1);
    } 
  }

  renderItems(expenseArray);
  window.localStorage.setItem('list', JSON.stringify(expenseArray));
}

function getValue() {
  let storedListItems = window.localStorage.getItem('list');
  if (storedListItems) {
    expenseArray = JSON.parse(storedListItems);
    renderItems(expenseArray);
  }
}

getValue();

