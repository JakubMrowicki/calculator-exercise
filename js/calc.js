let a, b, op;
let display = "";
const BUTTONS = document.querySelectorAll(".button");
const NUMPAD = [...BUTTONS].filter((button) => button.dataset.numpad);
const ACTIONS = [...BUTTONS].filter((button) => button.dataset.action);

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
  if (replace) {
    display = inputString;
  } else {
    if (inputString === ".") {
      if (display.indexOf(".") !== -1) {
        return;
      }
      if (display.length === 0) {
        display += "0";
      }
    }
    display += inputString;
  }
  refreshDisplay();
};

const refreshDisplay = () =>
  // \u200E is required due to use of RTL text for left side ellipsis.
  (document.querySelector("#output").textContent = `\u200E${display}\u200E`);

const clearDisplay = () => {
  display = "";
  document.querySelector("#output").textContent = "0";
};

const flipSign = () => {
  if (display.length === 0) return;
  if (display[0] === "-") {
    display = display.slice(1);
  } else {
    display = "-" + display;
  }
  refreshDisplay();
};

const toPercent = () => {
  if (parseFloat(display) === 0 || display === "") return;
  display = (parseFloat(display) / 100).toString();
  refreshDisplay();
};

const btnPress = (button) => {
  const action = button.target.dataset.action;
  switch (action) {
    case "AC":
      clearDisplay();
      break;
    case "+/-":
      flipSign();
      break;
    case "%":
      toPercent();
      break;
    default:
      console.error(
        `Invalid button press detected, (does it contain dataset "data-action"?):`,
        button.target
      );
  }
};

// Add event listeners
NUMPAD.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    toDisplay(e.target.dataset.numpad);
  })
);

ACTIONS.forEach((btn) => btn.addEventListener("click", (e) => btnPress(e)));

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
