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
dom.renderList(dom.tab.INBOX, todo.todoList);

// inbox tab
const inboxTab = document.querySelector('#inbox-tab');
inboxTab.addEventListener('click', (event) => {
    dom.showTab(dom.tab.INBOX, todo.todoList)
});

// today tab
const todayTab = document.querySelector('#today-tab');
todayTab.addEventListener('click', (event) => {
    dom.showTab(dom.tab.TODAY, todo.todoList)
});

// upcoming tab
const upcomingTab = document.querySelector('#upcoming-tab');
upcomingTab.addEventListener('click', (event) => {
    dom.showTab(dom.tab.UPCOMING, todo.todoList);
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
addButton.addEventListener('click', dom.showModal);

// cancel add todo
const closeModal = document.querySelector('#modal-cancel');
closeModal.addEventListener('click', dom.hideModal);

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

    dom.renderList(dom.tab.CURRENT, todo.todoList);
    dom.hideModal();
});

// hide modal on click
const modal = document.querySelector('.modal');
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        dom.hideModal();
    }
});