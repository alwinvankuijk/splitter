const billAmountInput = document.getElementById('bill-amount');
const tipOptionButtons = document.getElementsByClassName('tip-option');
const customTipInput = document.getElementById('custom-tip');
const peopleAmountInput = document.getElementById('people-amount');
const tipAmountText = document.getElementById('tip-amount');
const totalText = document.getElementById('total');
const totalTipText = document.getElementById('total-tip');
const resetButton = document.getElementById('reset-button');

var digitPeriodRegExp = new RegExp('\\d|\\.');

let billAmount = 0,
    tipPercentage = 0.1,
    peopleAmount = 0,
    tipAmount = 0,
    total = 0,
    totalTip = 0;

// Calculates the different values and sets the display texts on the page
function calculateTip() {
    if(billAmount != 0 && peopleAmount != 0) {
        // Calculating values and applying them to a variable
        const tipAmountCalc = billAmount / peopleAmount * tipPercentage,
            totalCalc = tipAmountCalc + (billAmount / peopleAmount),
            totalTipCalc = totalCalc * peopleAmount;

        // Converting the calculated values
        tipAmount = formatResult(tipAmountCalc);
        total = formatResult(totalCalc);
        totalTip = formatResult(totalTipCalc);

        // Applying the values to the elements
        tipAmountText.innerText = tipAmount;
        totalText.innerText = total;
        totalTipText.innerText = totalTip;
    } else {
        tipAmountText.innerText = formatResult(0);
        totalText.innerText = formatResult(0);
        totalTipText.innerText = formatResult(0);
    }
};

// Resets the calculated values, input fields and display texts
function resetCalculator() {
    billAmount = 0;
    peopleAmount = 0;
    tipAmount = 0;
    total = 0;
    tipAmountText.innerText = formatResult(0);
    totalText.innerText = formatResult(0);
    totalTipText.innerText = formatResult(0);
    billAmountInput.value = '';
    peopleAmountInput.value = '';
};

// Prevents the user from typing invalid values, such as numbers and special characters
function inputValidation(event, allowPeriod) {
    // If the user presses the backspace button... continue
    if(event.keyCode == 8) return;
 
    // Prevents the user from typing periods when not allowed
    if(!allowPeriod && event.keyCode == 190) event.preventDefault();
    
    if(!digitPeriodRegExp.test(event.key)) { // This prevents the user from typing anything other then a digit or period
        event.preventDefault();
    } else if(event.keyCode == 190 && event.target.value.includes('.')) { // This prevents the user from typing multiple periods
        event.preventDefault();
    } else if(event.ctrlKey // This prevents the user from using the ALT, CTRL and CMD/WINDOWS buttons
    || event.altKey
    || event.metaKey
    || typeof event.key !== 'string'
    || event.key.length !== 1) {
        event.preventDefault();
    }
};

// Rounding the result to 2 digits and adding the dollar sign
function formatResult(num) {
    return '$' + new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
};

// Switching between the different tip percentage buttons/values
Array.from(tipOptionButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
        if(event.target.value != tipPercentage) {
            document.querySelector(`[value="${tipPercentage}"]`).classList.remove('btn-selected');
            tipPercentage = event.target.value;
            button.classList.add('btn-selected');
            calculateTip();
        }
    });
});

/*
*   Event handling
*/
billAmountInput.addEventListener('keydown', (event) => { inputValidation(event, true) });

billAmountInput.addEventListener('keyup', (event) => {
    billAmount = event.target.value;
    calculateTip();
});

peopleAmountInput.addEventListener('keydown', (event) => { inputValidation(event, false) });

peopleAmountInput.addEventListener('keyup', (event) => {
    peopleAmount = event.target.value;
    calculateTip();
});

resetButton.addEventListener('click', (event) => {
    resetCalculator();
});
