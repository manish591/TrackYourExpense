const totalExpense = document.querySelector(".totalexpense");
const inputAmountSpend = document.querySelector(".amountspend");
const inputAmountDescription = document.querySelector(".amountspenton");
const addButton = document.querySelector(".addtolist");
const expenseListInView = document.querySelector(".expenselist");
const deleteButton = document.querySelector('.delete');



let valueInView = 0;
let expenseArray = [];
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

  expenseArray.push(expenseObj);

  let arrayListItems = expenseArray.map(item => createExpenseLists(item.amount, item.description, item.moment))
  let joinedList = arrayListItems.join("");


  updateTotalValue(amount, totalExpense);
  expenseListInView.innerHTML = joinedList;
}

function createExpenseLists(rupees, name, moment) {
    return `
      <div class="list"> 
        <div class="listtitle">
          <p class="name">${name}</p>
          <span class="date">${moment.toLocaleDateString('en-US', options)}</span>
        </div>
        <div class="other">
          <strong>${rupees}</strong>
          <button class="delete">x</button>
        </div>
      </div>`;
}

function updateTotalValue(amountGiven, total) {
    valueInView = valueInView + amountGiven;
    total.innerText = `${valueInView}`
}
