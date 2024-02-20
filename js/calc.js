let a, b, op, display;

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

// toDisplay appends a character to the display.
const toDisplay = (character) => {
  if (typeof display === "undefined") display = "";
  display += character;
  updateDisplay();
};

const updateDisplay = () =>
  (document.querySelector("#output").textContent = display);

const clearDisplay = () => {
  display = "";
  document.querySelector("#output").textContent = "";
};

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
