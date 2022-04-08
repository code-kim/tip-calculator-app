const billInp = document.querySelector(".inp-bill");
const peopleInp = document.querySelector(".inp-people");
const errorMsg = document.querySelector(".error-msg");
const btnsContainer = document.querySelector(".btns-container");
const btns = document.querySelectorAll(".btn");
const amountNumber = document.querySelector(".amount-number");
const totalNumber = document.querySelector(".total-number");
const resetBtn = document.querySelector(".reset-btn");
const customBtn = document.querySelector(".custom-btn");
const customInp = document.querySelector(".custom-inp");

let currentTip = 0;

// event listener for buttons (not including custom)
btnsContainer.addEventListener("click", function (e) {
	// set clicked variable to button that was clicked
	const clicked = e.target.closest(".btn");

	// if click happened outside of the button return
	if (!clicked) return;

	// set the current tip to the text content of button that was clicked
	currentTip = Number.parseFloat(clicked.textContent);

	// remove styling of all buttons once another is clicked
	btns.forEach((btn) => {
		btn.classList.remove("clicked-btn");
	});
	// change css styling of button once clicked
	clicked.classList.toggle("clicked-btn");
});

// when custom button is clicked, hide button, show text input
customBtn.addEventListener("click", function (e) {
	btns.forEach((btn) => btn.classList.remove("clicked-btn"));
	customInp.classList.remove("hidden");
	customBtn.classList.add("hidden");
});

// once 'enter' pressed, calculate tip and total based on custom tip value
customInp.addEventListener("input", function (e) {
	currentTip = +customInp.value;
});

// display tip
const tipSelection = function (bill, tip, people) {
	const tipAmount = (bill * tip) / 100;
	const tipPerPerson = tipAmount / people;
	amountNumber.textContent = `$${tipPerPerson.toFixed(2)}`;
};

// display total
const totalAmount = function (bill, tip, people) {
	const tipAmount = bill * (tip / 100);
	const totalAmount = (tipAmount + +bill) / people;
	totalNumber.textContent = `$${totalAmount.toFixed(2)}`;
};

document.addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		// show error if 0 is entered in 'number of people' input box
		if (+peopleInp.value === 0) {
			errorMsg.classList.remove("hidden");
			peopleInp.classList.add("error-border");
		} else {
			// make sure error message is hidden again
			errorMsg.classList.add("hidden");
			peopleInp.classList.remove("error-border");

			// calculate tip and total based on input and display it
			tipSelection(billInp.value, currentTip, peopleInp.value);
			totalAmount(billInp.value, currentTip, peopleInp.value);

			// change styling of reset button
			resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
		}
	}
});

// clear all data entered and displayed
resetBtn.addEventListener("click", function () {
	billInp.value = " ";
	peopleInp.value = " ";
	customInp.value = " ";

	amountNumber.textContent = "$0.00";
	totalNumber.textContent = "$0.00";
	btns.forEach((btn) => btn.classList.remove("clicked-btn"));
	customInp.classList.add("hidden");
	customBtn.classList.remove("hidden");
	resetBtn.style.backgroundColor = "hsl(186, 14%, 43%)";
});
