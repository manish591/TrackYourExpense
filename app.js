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

  expenseArray.push(expenseObj);

  renderItems(expenseArray);
  console.log(expenseArray)
  console.log(typeof expenseArray[0].moment)

  updateTotalValue(amount, totalExpense);
  window.localStorage.setItem('list', JSON.stringify(expenseArray));
}

function createExpenseLists(rupees, name, moment) {
    return `
      <div class="list">
        <div class="listtitle">
          <p class="name">${name}</p>
          <span class="date">${moment}</span>
        </div>
        <div class="other">
          <strong>${rupees}</strong>
          <button class="delete" onclick="deleteItemFromList(${moment.valueOf()})">X</button>
          <button class="test" onclick="testing(${moment.valueOf()})">Testing</button>
        </div>
      </div>`;
}

function updateTotalValue(amountGiven, total) {
    valueInView = valueInView + amountGiven;
    total.innerText = `${valueInView}`
}

function renderItems(arr) {
  let arrayListItems = arr.map(item => createExpenseLists(item.amount, item.description, item.moment))
  let joinedList = arrayListItems.join("");
  expenseListInView.innerHTML = joinedList;
}

function deleteItemFromList(dateValue) {
  console.log('hhhhh');
  for(let i = 0; i < expenseArray.length; i++) {
    if(expenseArray[i].moment.valueOf() === dateValue) {
      console.log('working')
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
    console.log(storedListItems)
    const newArr = JSON.parse(storedListItems);
    renderItems(newArr);
    console.log(typeof newArr[0].moment)
    console.log(newArr);
  }
}

getValue();


function testing(dateValue) {
  expenseArray = expenseArray.filter(e => e.moment.valueOf() !== dateValue);
  console.lo
  console.log('when loading', expenseArray)
  renderItems(expenseArray);
  window.localStorage.setItem('list', JSON.stringify(expenseArray));
}
