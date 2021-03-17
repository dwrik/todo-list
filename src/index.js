import * as dom from './dom';
import * as todo from './todo';
import flatpickr from 'flatpickr';
import { isAfter, isToday } from 'date-fns'

// initialize custom datepicker
flatpickr('.flatpickr', {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
    enable: [
        (date) => isToday(date) || isAfter(date, new Date())
    ],
});

// initial rendering of list
dom.renderList(dom.tab.INBOX, todo.projects['Inbox']);
dom.renderProjectsList(todo.projects);

const tabs = [ ...document.querySelectorAll('.tab') ];
tabs.forEach(tab => tab.addEventListener('click', (event) => {
    tabs.forEach(t => t.classList.remove('selected'));
    if (tab === event.target) {
        tab.classList.add('selected');
    }
}));

// inbox tab
const inboxTab = document.querySelector('#inbox-tab');
inboxTab.addEventListener('click', (event) => {
    dom.showTab(dom.tab.INBOX, todo.todoList)
});

// today tab
const todayTab = document.querySelector('#today-tab');
todayTab.addEventListener('click', (event) => {
    dom.showTab(
        dom.tab.TODAY,
        Object.getOwnPropertyNames(todo.projects)
        .map(key => todo.projects[key])
        .reduce((prev, curr) => prev.concat(curr)
        ));
});

// upcoming tab
const upcomingTab = document.querySelector('#upcoming-tab');
upcomingTab.addEventListener('click', (event) => {
    dom.showTab(
        dom.tab.UPCOMING,
        Object.getOwnPropertyNames(todo.projects)
        .map(key => todo.projects[key])
        .reduce((prev, curr) => prev.concat(curr)
        ));
});

// toggle project menu
const projectsTab = document.querySelector('#projects-tab');
projectsTab.addEventListener('click', dom.toggleProjects);

// open sidebar
const menuButton = document.querySelector('#menu-button');
menuButton.addEventListener('click', dom.openMenu);

// close sidebar
const closeMenu = document.querySelector('#close-button');
closeMenu.addEventListener('click', dom.closeMenu);

// add todo form
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', dom.showTodoModal);

// cancel add todo
const cancelTodo = document.querySelector('#todo-modal-cancel');
cancelTodo.addEventListener('click', dom.hideTodoModal);

// submit add todo form
const todoForm = document.querySelector('#todo-form');
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(todoForm);
    const operation = document.querySelector('#operation').value;

    switch (operation) {
        case 'add':    todo.addTodo(formData); break;
        case 'update': todo.updateTodo(formData); break;
    }

    if (dom.tab.CURRENT === dom.tab.TODAY || dom.tab.CURRENT === dom.tab.UPCOMING) {
        dom.renderList(
            dom.tab.CURRENT,
            Object.getOwnPropertyNames(todo.projects)
            .map(key => todo.projects[key])
            .reduce((prev, curr) => prev.concat(curr)
            ));
    } else {
        dom.renderList(
            dom.tab.CURRENT,
            todo.projects[dom.tab.CURRENT]
            );
    }

    dom.hideTodoModal();
});

// new project form
const newProject = document.querySelector('#add-project');
newProject.addEventListener('click', dom.showProjectModal);

// cancel add project
const cancelProject = document.querySelector('#project-modal-cancel');
cancelProject.addEventListener('click', dom.hideProjectModal);

// submit add project form
const projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(projectForm);
    todo.addProject(formData);
    dom.renderProjectsList(todo.projects);
    dom.hideProjectModal();
});

// hide modals on click
const todoModal = document.querySelector('.modal#todo-modal');
const projectModal = document.querySelector('.modal#project-modal');
window.addEventListener('click', (event) => {
    if (event.target === todoModal) {
        dom.hideTodoModal();
    }

    if (event.target === projectModal) {
        dom.hideProjectModal();
    }
});