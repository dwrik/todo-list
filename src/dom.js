import { todoList, TodoElement } from './todo';


const renderList = () => {

    const projectTodos = document.querySelector('.project-todos');

    const removeExistingList = () => {
        const todos = [ ...document.querySelectorAll('.todo-container') ];
        todos.forEach(todo => projectTodos.removeChild(todo));
    };

    removeExistingList();

    for (let index in todoList) {
        const todoElement = TodoElement(todoList[index], index);
        projectTodos.appendChild(todoElement);
    }

};

const openMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.width = '100%';
};

const closeMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.removeProperty('width');
};

const toggleProjects = () => {
    const sidebarVariableItems = document.querySelector('.sidebar-variable-items');
    const projects = document.querySelector('.projects');
    const footer = document.querySelector('.footer');

    if (projects.style.maxHeight) {
        projects.style.overflow = 'hidden';
        projects.style.maxHeight = null;
    } else {
        projects.style.overflow = 'auto';
        projects.style.maxHeight = `calc(${sidebarVariableItems.scrollHeight}px - ${footer.scrollHeight}px)`;
    }
}

const hideModal = (event) => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
};

const showModal = (event) => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
};

export { renderList, openMenu, closeMenu, toggleProjects, hideModal, showModal };