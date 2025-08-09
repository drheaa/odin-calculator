function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("Cannot divide by zero");
    return null;
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}


const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = null;
      display.textContent = '0';
    } else if (value === '=') {
      if (previousInput && operator) {
        currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
        display.textContent = currentInput;
        previousInput = '';
        operator = null;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (previousInput && operator) {
        currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
        display.textContent = currentInput;
      }
      operator = value;
      previousInput = currentInput;
      currentInput = '';
    } else {
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});



