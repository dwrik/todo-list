import { format, isToday } from 'date-fns';
import isAfter from 'date-fns/isAfter';
import { changePriority, deleteTodo } from './todo';

// sidebar tabs
export const tab = {
    INBOX: 'Inbox',
    TODAY: 'Today',
    UPCOMING: 'Upcoming',
    CURRENT: 'Inbox',
};

// renders todo list based on selected sidebar tab
export const renderList = (currTab, todoList) => {
    const projectTodos = document.querySelector('.project-todos');
    tab.CURRENT = currTab;

    // remove existing list elements
    const todos = [ ...document.querySelectorAll('.todo-container') ];
    todos.forEach(todo => projectTodos.removeChild(todo));

    let filteredList;

    // filter list based on tab
    switch(tab.CURRENT) {
        case tab.INBOX:
            filteredList = todoList;
            break;

        case tab.TODAY:
            filteredList = todoList.filter(todo =>
                isToday(
                    new Date(todo.dueDate)
                ));
            break;

        case tab.UPCOMING:
            filteredList = todoList.filter(todo =>
                isAfter(
                    new Date(todo.dueDate),
                    new Date()
                ))
                filteredList.sort((a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            break;
    }

    // add filtered list elements to DOM
    for (let index in filteredList) {
        const todoElement = getTodoElement(todoList, filteredList[index]);
        projectTodos.appendChild(todoElement);
    }

};

// update project header and renders todo list
export const showTab = (tab, todoList) => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.style.width === '100%') {
        closeMenu();
    }

    const projectName = document.querySelector('.project-name');
    projectName.innerHTML = tab;

    renderList(tab, todoList);
};

// open sidebar
export const openMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.width = '100%';
};

// close sidebar
export const closeMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.removeProperty('width');
};

// toggle custom project list
export const toggleProjects = () => {
    const sidebarVariableItems = document.querySelector('.sidebar-variable-items');
    const expandProjects = document.querySelector('#expand-projects');
    const projects = document.querySelector('.projects');
    const footer = document.querySelector('.footer');

    if (projects.style.maxHeight) {
        expandProjects.classList.remove('rotate');
        projects.style.overflow = 'hidden';
        projects.style.maxHeight = null;
    } else {
        expandProjects.classList.add('rotate');
        projects.style.overflow = 'auto';
        projects.style.maxHeight = `calc(${sidebarVariableItems.scrollHeight}px - ${footer.scrollHeight}px)`;
    }
}

// hides modal and resets form
export const hideModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';

    const id = document.querySelector('input[name="id"]');
    id.value = '';

    const operation = document.querySelector('#operation');
    operation.value = 'add';

    const todoForm = document.querySelector('#todo-form');
    todoForm.reset();

    const datePicker = document.querySelector('.flatpickr.modal-input')._flatpickr;
    datePicker.clear();
    
    const modalHeading = document.querySelector('.modal-heading');
    modalHeading.innerHTML = 'Add Todo';
};


// view modal
export const showModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
};

// private helper for creating todo dom element
const getTodoElement = (todoList, todoObject) => {

    // todo container : todo + todo details
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    // todo : checkbox + todo content
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const checkbox = document.createElement('span');
    checkbox.classList.add('material-icons');
    checkbox.id = `checkbox-${todoObject.id}`;

    // todo content : todo body + actions
    const todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');

    const todoBody = document.createElement('div');
    todoBody.classList.add('todo-body');

    const title = document.createElement('label');
    title.htmlFor = `checkbox-${todoObject.id}`;
    title.innerHTML = todoObject.title;

    todoBody.appendChild(title);

    // add date if present
    if (todoObject.dueDate) {
        const dueDate = document.createElement('p');
        dueDate.classList.add('duedate');

        const date = format(new Date(todoObject.dueDate), 'dd MMM');
        dueDate.innerHTML = date;

        todoBody.appendChild(dueDate);
    }

    // actions (edit, priority, delete)
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editIcon = document.createElement('span');
    editIcon.classList.add('material-icons-outlined', 'md-20', 'darkgrey');
    editIcon.innerHTML = 'edit';

    const flagIcon = document.createElement('span');
    flagIcon.classList.add('material-icons', 'md-20', `priority-${todoObject.priority}`);
    flagIcon.innerHTML = 'flag';

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons-outlined', 'md-20', 'darkgrey');
    deleteIcon.innerHTML = 'delete';

    actions.appendChild(editIcon);
    actions.appendChild(flagIcon);
    actions.appendChild(deleteIcon);

    todoContent.appendChild(todoBody);
    todoContent.appendChild(actions);

    todo.appendChild(checkbox);
    todo.appendChild(todoContent);

    // todo details : description + other details (due date & priority)
    const todoDetails = document.createElement('div');
    todoDetails.classList.add('todo-details');
    todoDetails.id = `todo-detail-${todoObject.id}`;

    const description = document.createElement('div');
    description.classList.add('description');

    const descriptionText = document.createElement('p');
    descriptionText.innerHTML = todoObject.description;

    description.appendChild(descriptionText);

    const otherDetails = document.createElement('div');
    otherDetails.classList.add('other-details');

    const date = document.createElement('div');
    date.classList.add('date');

    const dateHeading = document.createElement('span');
    dateHeading.classList.add('date-heading');
    dateHeading.innerHTML = 'Due Date: ';

    date.appendChild(dateHeading);

    const dueDate = (todoObject.dueDate)?
            format(new Date(todoObject.dueDate), 'dd.MM.yyyy') : 'N/A';

    dateHeading.after(dueDate);

    const priority = document.createElement('div');
    priority.classList.add('priority');

    const priorityHeading = document.createElement('span');
    priorityHeading.classList.add('priority-heading');
    priorityHeading.innerHTML = 'Priority: ';

    // helper
    const capitalize = (string) => {
        return string.charAt(0)
                .toUpperCase()
                .concat(string.slice(1));
    };

    priority.appendChild(priorityHeading);
    priorityHeading.after(`${capitalize(todoObject.priority)}`);

    otherDetails.appendChild(date);
    otherDetails.appendChild(priority);

    todoDetails.appendChild(description);
    todoDetails.appendChild(otherDetails);

    todoContainer.appendChild(todo);
    todoContainer.appendChild(todoDetails);

    // event listeners :
    // todoBody, todoDetails, checkbox, edit, flag, delete

    const toggleDetails = (event) => {
        const todoDetails = document.querySelector(`#todo-detail-${todoObject.id}`);
        const todo = todoDetails.previousSibling;

        todo.classList.toggle('border-hide');
        todoDetails.classList.toggle('visibility');

        if (todoDetails.style.maxHeight) {
            todoDetails.style.maxHeight = null;
        } else {
            todoDetails.style.maxHeight = todoDetails.scrollHeight + "px";
        }
    };

    // toggle details using todo body/details
    todoBody.addEventListener('click', toggleDetails);
    todoDetails.addEventListener('click', toggleDetails);

    // mark todo as checked/unchecked
    checkbox.addEventListener('click', (event) => {
        checkbox.classList.toggle('grey');
        checkbox.classList.toggle('blue');

        checkbox.parentElement.classList.toggle('checked');
        checkbox.parentElement.nextSibling.classList.toggle('checked');

        checkbox.innerHTML = (checkbox.innerHTML === 'check_circle')?
                'radio_button_unchecked' : 'check_circle';

        todoObject.isChecked = (todoObject.isChecked)? false : true;
    });

    // edit todo
    editIcon.addEventListener('click', (event) => {
        showModal();

        const modalHeading = document.querySelector('.modal-heading');
        modalHeading.innerHTML = 'Edit Todo';

        const operation = document.querySelector('#operation');
        operation.value = 'update';

        const id = document.querySelector('input[name="id"]');
        id.value = todoObject.id;

        const title= document.querySelector('.modal-input[name="title"]');
        title.value = todoObject.title;

        const description= document.querySelector('.modal-input[name="description"]');
        description.value = todoObject.description;

        const date = document.querySelector('.flatpickr.modal-input')._flatpickr;
        date.setDate(todoObject.dueDate);

        const priority = document.querySelector('.modal-input[name="priority"]');
        priority.value = todoObject.priority;
    });

    // change priority
    flagIcon.addEventListener('click', (event) => {
        flagIcon.classList.remove(`priority-${todoObject.priority}`)
        changePriority(todoObject.id);
        flagIcon.classList.add(`priority-${todoObject.priority}`)
        renderList(tab.CURRENT, todoList);
    });

    // delete todo
    deleteIcon.addEventListener('click', (event) => {
        deleteTodo(todoObject.id);
        renderList(tab.CURRENT, todoList);
    });

    // set todo checked status after it has been
    // attached to DOM to avoid TypeError 
    if (todoObject.isChecked) {
        checkbox.classList.add('blue');
        checkbox.parentElement.classList.add('checked');
        checkbox.parentElement.nextSibling.classList.add('checked');
        checkbox.innerHTML = 'check_circle';
    } else {
        checkbox.classList.add('grey');
        checkbox.innerHTML = 'radio_button_unchecked';
    }

    return todoContainer;
}