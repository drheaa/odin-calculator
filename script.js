// Basic Math Operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? alert("Cannot divide by zero") : a / b);

// Operation handler
const operate = (operator, a, b) => {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
};

// Handle calculator display and input
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

// Update the display
const updateDisplay = () => {
  display.textContent = currentInput || '0';
};

// Handle number and operator input
const handleInput = (value) => {
  if (['+', '-', '*', '/'].includes(value)) {
    if (previousInput && operator) {
      currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
      updateDisplay();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
  } else if (value === '.') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  } else if (value === 'C') {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
  } else if (value === '=') {
    if (previousInput && operator) {
      currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
      updateDisplay();
      previousInput = '';
      operator = null;
    }
  } else {
    currentInput += value;
    updateDisplay();
  }
};

// Handle backspace
const handleBackspace = () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
};

// Handle button clicks
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => handleInput(button.getAttribute('data-value')));
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ('0123456789'.includes(key)) {
    currentInput += key;
    updateDisplay();
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter' || key === '=') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleBackspace();
  } else if (key === 'Escape' || key === 'C') {
    handleInput('C');
  }
});

// Handle backspace button
document.querySelector('[data-value="backspace"]').addEventListener('click', handleBackspace);
