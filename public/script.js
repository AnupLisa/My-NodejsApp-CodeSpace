const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-btn');
const clearCalc = document.getElementById('clear-calc');
const deleteCalc = document.getElementById('delete-calc');

let todoItems = [];
let calcExpression = '';

function renderTodos() {
  todoList.innerHTML = '';
  todoItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.done ? 'completed' : '';

    const label = document.createElement('span');
    label.textContent = item.text;

    const buttons = document.createElement('div');
    buttons.className = 'todo-buttons';

    const doneButton = document.createElement('button');
    doneButton.textContent = item.done ? 'Undo' : 'Done';
    doneButton.addEventListener('click', () => toggleDone(index));

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    removeButton.addEventListener('click', () => removeTodo(index));

    buttons.append(doneButton, removeButton);
    li.append(label, buttons);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return;
  todoItems.push({ text: value, done: false });
  todoInput.value = '';
  renderTodos();
}

function toggleDone(index) {
  todoItems[index].done = !todoItems[index].done;
  renderTodos();
}

function removeTodo(index) {
  todoItems.splice(index, 1);
  renderTodos();
}

function updateCalcDisplay() {
  calcDisplay.textContent = calcExpression || '0';
}

function appendCalcValue(value) {
  if (value === '=') {
    calculateResult();
    return;
  }
  calcExpression += value;
  updateCalcDisplay();
}

function calculateResult() {
  try {
    const sanitized = calcExpression.replace(/[^0-9.+\-*/()]/g, '');
    if (!sanitized) return;
    const result = Function(`"use strict"; return (${sanitized})`)();
    calcExpression = String(result);
    updateCalcDisplay();
  } catch (error) {
    calcDisplay.textContent = 'Error';
    calcExpression = '';
  }
}

addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTodo();
});

calcButtons.forEach((button) => {
  button.addEventListener('click', () => appendCalcValue(button.dataset.value));
});

clearCalc.addEventListener('click', () => {
  calcExpression = '';
  updateCalcDisplay();
});

deleteCalc.addEventListener('click', () => {
  calcExpression = calcExpression.slice(0, -1);
  updateCalcDisplay();
});

renderTodos();
updateCalcDisplay();
