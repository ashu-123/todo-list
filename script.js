const inputTodo = document.getElementById('input-todo');
const form = document.getElementById('create-todo');
const todoList = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});


function addTodo(todo) {
    let todoText = inputTodo.value;
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement('li');
        if (todo && todo.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.innerText = todoText;

        todoElement.addEventListener('click', () => {
            todoElement.classList.toggle('completed');
            updateTodoList();
        });

        todoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoElement.remove();
            updateTodoList();
        });

        todoList.appendChild(todoElement);
        inputTodo.value = '';
        updateTodoList();
    }
}

function updateTodoList() {
    todosElement = document.querySelectorAll('li');
    const todos = [];
    todosElement.array.forEach(todoElement => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}