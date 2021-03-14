import { renderList } from './dom';

const Todo = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority
    };
};

let todoList = [];

const PRIORITY_LOW = 'low';
const PRIORITY_MEDIUM = 'medium';
const PRIORITY_HIGH = 'high';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam facere nisi voluptatibus cumque fugiat. Repudiandae itaque at adipisci aspernatur et veritatis blanditiis a, quia suscipit recusandae non, aut ad!';

todoList.push(Todo('Dog food', lorem, null, PRIORITY_HIGH));
todoList.push(Todo('Buy whiteboard and accessories', 'Preferrably 3x4 and markers', '28 Mar 2021', PRIORITY_LOW));
todoList.push(Todo('Get groceries', lorem, '15 Apr 2021', PRIORITY_MEDIUM));

const TodoElement = (todoObject, index) => {

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
        if (todoDetails === null) return;

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
        const date = todoObject.dueDate.split(' ');
        dueDate.innerHTML = date[0] + ' ' + date[1];
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
        // const nodeToRemove = event.target.closest('.todo-container');
        // nodeToRemove.parentElement.removeChild(nodeToRemove);
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
    dateHeading.after(`${todoObject.dueDate ?? 'N/A'}`);

    const priority = document.createElement('div');
    date.classList.add('priority');

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

export { todoList, TodoElement };