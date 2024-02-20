let a,
  b = undefined;
let op,
  display = "0";
const BUTTONS = document.querySelectorAll(".button");
const NUMPAD = [...BUTTONS].filter((button) => button.dataset.numpad);
const ACTIONS = [...BUTTONS].filter((button) => button.dataset.action);

// operate() takes in two numbers and an operator
// then performs the relevant operation.
const operate = (a, b, operator) => {
  if (isNaN(a) || isNaN(b)) {
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
      if (display[0] === "0") {
        display += inputString;
        refreshDisplay();
        return;
      }
    }
    display += inputString;
  }
  display = (parseFloat(display) - 0).toString();
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
  if (display === "0") return;
  if (display.indexOf("-") !== -1) {
    display = display.slice(1);
  } else {
    display = "-" + display;
  }
  refreshDisplay();
};

const toPercent = () => {
  if (display === "") {
    display = document
      .querySelector("#output")
      .textContent.replace(/[^0-9.]/g, "");
  }

  if (parseFloat(display) === 0) return;
  display = (parseFloat(display) / 100).toString();
  refreshDisplay();
};

const actionClick = (action) => {
  if (["+", "-", "*", "/"].indexOf(action) !== -1) {
    if (typeof a === "undefined") {
      a = parseFloat(display);
      op = action;
      clearDisplay();
    } else {
      b = parseFloat(display);
      toDisplay(operate(a, b, op).toString(), true);
      a = parseFloat(display);
      display = "";
      b = undefined;
    }
  } else if (action === "=") {
    if (a && op !== "") {
      if (display === "") {
        return;
      }
      toDisplay(operate(a, parseFloat(display), op).toString(), true);
      a = undefined;
      b = undefined;
      op = "";
    }
  }
  console.log(a, b, op, display);
};

const btnPress = (button) => {
  const action = button.target.dataset.action;
  switch (action) {
    case "AC":
      a = b = op = undefined;
      clearDisplay();
      break;
    case "+/-":
      if (display === "") {
        display = document.querySelector("#output").textContent;
      }
      flipSign();
      break;
    case "%":
      toPercent();
      break;
    default:
      actionClick(action);
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
