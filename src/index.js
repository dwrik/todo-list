import * as dom from './dom';

dom.renderList();

const projectsTab = document.querySelector('#projects-tab');
projectsTab.addEventListener('click', dom.toggleProjects);

const menuButton = document.querySelector('#menu-button');
menuButton.addEventListener('click', dom.openMenu);

const closeMenu = document.querySelector('#close-button');
closeMenu.addEventListener('click', dom.closeMenu);

const closeModal = document.querySelector('#modal-cancel');
closeModal.addEventListener('click', dom.hideModal);

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', dom.showModal);

const modal = document.querySelector('.modal');
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        dom.hideModal(event);
    }
});