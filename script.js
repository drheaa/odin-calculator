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



if (value === '.') {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    display.textContent = currentInput;
  }
}


<button class="btn" data-value="backspace">←</button>

document.querySelector('[data-value="backspace"]').addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || '0';
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ('0123456789'.includes(key)) {
    currentInput += key;
    display.textContent = currentInput;
  } else if (['+', '-', '*', '/'].includes(key)) {
    if (previousInput && operator) {
      currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
      display.textContent = currentInput;
    }
    operator = key;
    previousInput = currentInput;
    currentInput = '';
  } else if (key === 'Enter' || key === '=') {
    if (previousInput && operator) {
      currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
      display.textContent = currentInput;
      previousInput = '';
      operator = null;
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  } else if (key === 'Escape' || key === 'C') {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.textContent = '0';
  }
});
