let a, b, op, display;
const BUTTONS = document.querySelectorAll(".button");
const NUMPAD = [...BUTTONS].filter((button) => button.dataset.numpad);
const ACTION = [...BUTTONS].filter((button) => button.dataset.action);

// operate() takes in two numbers and an operator
// then performs the relevant operation.
const operate = (a, b, operator) => {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return console.error(
      `Numbers (${[a, b]}) entered are not valid. Must be of type 'number'`
    );
  }
  switch (operator) {
    case "+":
      return Add(a, b);
    case "-":
      return Subtract(a, b);
    case "*":
      return Multiply(a, b);
    case "/":
      return Divide(a, b);
    default:
      return console.error(`Operator ("${operator}") not supported.`);
  }
};

// toDisplay appends a character to the display or replaces it entirely.
const toDisplay = (inputString, replace = false) => {
  if (typeof display === "undefined") display = "";
  if (replace) {
    display = inputString;
  } else {
    display += inputString;
  }
  refreshDisplay();
};

const refreshDisplay = () =>
  (document.querySelector("#output").textContent = `\u200E${display}\u200E`);

const clearDisplay = () => {
  display = "";
  document.querySelector("#output").textContent = "0";
};

// Add event listeners
NUMPAD.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    toDisplay(e.target.dataset.numpad);
    console.log(display);
  });
});

const Add = (a, b) => {
  return a + b;
};

const Subtract = (a, b) => {
  return a - b;
};

const Multiply = (a, b) => {
  return a * b;
};

const Divide = (a, b) => {
  return a / b;
};
