const totalExpense = document.querySelector(".totalexpense");
const inputAmountSpend = document.querySelector(".amountspend");
const inputAmountDescription = document.querySelector(".amountspenton");
const addButton = document.querySelector(".addtolist");
const expenseListInView = document.querySelector(".expenselist");

addButton.addEventListener("click", addExpensesToTheList);


function addExpensesToTheList() {
  let amount = Number(inputAmountSpend.value);
  let amountDescription = inputAmountDescription.value;

  if(inputAmountSpend.value === '' || inputAmountDescription.value === '') {
    return console.log('Please input!')
  } else if (Number(inputAmountSpend.value) < 1) {
      return console.log('Please input a valid value!');
  }

  createExpenseLists(amount, amountDescription);
  updateTotalValue(amount, totalExpense)
}

function createExpenseLists(rupees, name) {
    let list = document.createElement("div");
    list.classList.add("list");
    expenseListInView.appendChild(list);
    list.innerHTML = `
     <p class="name">${name}</p>
      <div class="other">
        <strong>${rupees}</strong>
        <button class="delete">x</button>
      </div>`;
}

function updateTotalValue(amountGiven, total) {
    let valueInView = Number(total.innerText);
    let calculation = valueInView += amountGiven;
    total.innerText = `${calculation}`
}