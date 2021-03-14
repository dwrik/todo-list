import { todoList, TodoElement } from './todo';
import { renderList, openMenu, closeMenu, toggleProjects } from './dom';

renderList();

const projectsTab = document.querySelector('#projects-tab');
projectsTab.addEventListener('click', toggleProjects);

const menuButton = document.querySelector('#menu-button');
menuButton.addEventListener('click', openMenu);

const closeButton = document.querySelector('#close-button');
closeButton.addEventListener('click', closeMenu);