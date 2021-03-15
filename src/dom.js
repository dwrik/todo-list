import { format } from 'date-fns';

export const renderList = (todoList) => {
    const projectTodos = document.querySelector('.project-todos');

    const removeExistingList = () => {
        const todos = [ ...document.querySelectorAll('.todo-container') ];
        todos.forEach(todo => projectTodos.removeChild(todo));
    };

    removeExistingList();

    for (let index in todoList) {
        const todoElement = getTodoElement(todoList, todoList[index], index);
        projectTodos.appendChild(todoElement);
    }

};

export const openMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.width = '100%';
};

export const closeMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.removeProperty('width');
};

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

export const hideModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';

    const todoForm = document.querySelector('#todo-form');
    todoForm.reset();

    const datePicker = document.querySelector('.flatpickr.modal-input')._flatpickr;
    datePicker.clear();
};


export const showModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
};

export const getTodoElement = (todoList, todoObject, index) => {

    // todo container : todo + todo details

    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    // todo : icon + todo content

    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.id = `todo-${index}`;

    const checkbox = document.createElement('span');
    checkbox.classList.add('material-icons', 'grey');
    checkbox.innerHTML = 'radio_button_unchecked';
    checkbox.id = `checkbox-${index}`;

    checkbox.addEventListener('click', (event) => {
        checkbox.classList.toggle('grey');
        checkbox.classList.toggle('blue');

        checkbox.parentElement.classList.toggle('checked');
        checkbox.parentElement.nextSibling.classList.toggle('checked');

        checkbox.innerHTML = (checkbox.innerHTML === 'check_circle')?
                'radio_button_unchecked' : 'check_circle';
    });

    const todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');

    const toggleDetails = (event) => {
        const todoDetails = document.querySelector(`#todoDetails-${index}`);
        const todo = todoDetails.previousSibling;

        todo.classList.toggle('border-hide');
        todoDetails.classList.toggle('visibility');

        if (todoDetails.style.maxHeight) {
            todoDetails.style.maxHeight = null;
        } else {
            todoDetails.style.maxHeight = todoDetails.scrollHeight + "px";
        }
    };

    const todoBody = document.createElement('div');
    todoBody.classList.add('todo-body');
    todoBody.addEventListener('click', toggleDetails);

    const title = document.createElement('label');
    title.htmlFor = `checkbox-${index}`;
    title.innerHTML = todoObject.title;

    todoBody.appendChild(title);

    if (todoObject.dueDate) {
        const dueDate = document.createElement('p');
        dueDate.classList.add('duedate');

        const date = format(new Date(todoObject.dueDate), 'dd MMM');
        dueDate.innerHTML = date;

        todoBody.appendChild(dueDate);
    }

    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editIcon = document.createElement('span');
    editIcon.classList.add('material-icons-outlined', 'md-20', 'darkgrey');
    editIcon.innerHTML = 'edit';
    editIcon.id = `edit-${index}`;

    const flagIcon = document.createElement('span');
    flagIcon.classList.add('material-icons', 'md-20', `priority-${todoObject.priority}`);
    flagIcon.innerHTML = 'flag';
    flagIcon.id = `flag-${index}`;

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons-outlined', 'md-20', 'darkgrey');
    deleteIcon.innerHTML = 'delete';
    deleteIcon.id = `delete-${index}`;

    deleteIcon.addEventListener('click', (event) => {
        todoList.splice(index, 1);
        renderList(todoList);
    });

    actions.appendChild(editIcon);
    actions.appendChild(flagIcon);
    actions.appendChild(deleteIcon);

    todoContent.appendChild(todoBody);
    todoContent.appendChild(actions);

    todo.appendChild(checkbox);
    todo.appendChild(todoContent);

    // todo details

    const todoDetails = document.createElement('div');
    todoDetails.classList.add('todo-details');
    todoDetails.id = `todoDetails-${index}`

    todoDetails.addEventListener('click', toggleDetails);

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
            format(new Date(todoObject.dueDate), 'dd.MM.yyyy')
            : 'N/A';
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

    return todoContainer;
}