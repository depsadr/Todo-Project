// Declaring global variables
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const todo = document.querySelector('#todo')

// Declear an empty array
let todoList = [];

// When form submitted add an EventListener and send the function addTodo()
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Declear the addTodo()
function addTodo() {
    // get input
    const newTodo = input.value;
    // return when nothing was entered
    if(!newTodo) return;
    // add new task to todoList array
    todoList.push({
        text: newTodo,
        completed: false
    });
    // add the todoList array to localStorage and set the JavaScript Object to a JSON string
    localStorage.setItem('todos', JSON.stringify(todoList));
    // render todoList array
    render();
}

// Declear the render()
function render() {

    // Clearing the input tag after the user adds a task
    // Original is with innerHTML
    todo.innerHTML = null;
    // todo.textContent = null;

    // get the tdo list from localStorage
    const todos = localStorage.getItem('todos');
    todoList = JSON.parse(todos) || [];

    /**
     * The original source code uses a for loop
     * In version 2 I'll try to use only a forEach or another for..of for..in loop.
     * Look into the Dino Project
     */
    for(let i = 0; i < todoList.length; i++){

        // Create a list item element
        const listItem = document.createElement('li');

        // Create checkbox to update completed state
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        /**
         * To have multiple eventListeners look at the Mario Blog Project
         */
        // addEventListener to checkbox, click event
        checkbox.addEventListener('click', (e) => {
            todoList[i].completed = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todoList));

            // check if todo item is completed and add class to listItem
            if(todoList[i].completed) {
                listItem.classList.add('completed');
                listItem.classList.remove('uncompleted');
                checkbox.checked = todoList[i].completed;
            } else {
                listItem.classList.add('uncompleted');
                listItem.classList.remove('completed');
                checkbox.checked = todoList[i].completed;
            }
        });
    }

    // Create text node
    const text = document.createElement('p');
    text.innerText = todoList[i].text;

    // Create delete button
    const button = document.createElement('button');
    button.innerText = 'X';
    button.addEventListener('click', () => {
        todoList.splice(i, 1);
        localStorage.setItem('todos', JSON.stringify(todoList));
        render();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(button);
    todo.appendChild(listItem);
    input.value = null;
}