import { TodoElement } from './todo';

const projectTodos = document.querySelector('.project-todos');

const renderList = (todoList) => {

    const removeExistingList = () => {
        const todos = document.querySelectorAll('.todo-container');
        todos.forEach(todo => projectTodos.removeChild(todo));
    };

    removeExistingList();

    for (let index in todoList) {
        const todoElement = TodoElement(todoList[index], index);
        projectTodos.appendChild(todoElement);
    }

};

export { renderList };