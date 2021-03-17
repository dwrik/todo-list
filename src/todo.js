const Todo = (id, title, description, dueDate, priority, isChecked, project) => {
    return {
        id,
        title,
        description,
        dueDate,
        priority,
        isChecked,
        project,
    };
};

let nextTodoId = 3;

// zzzzzzzzzzzzzzzzzz
export const todoList = [];
const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam facere nisi voluptatibus cumque fugiat. Repudiandae itaque at adipisci aspernatur et veritatis blanditiis a, quia suscipit recusandae non, aut ad!';
todoList.push(Todo(0, 'Dog food', lorem, '2021.03.15', 'high', false, 'Inbox'));
todoList.push(Todo(1, 'Buy something', 'Eggs, Apples, Nuts', '2021.03.28', 'low', false, 'Inbox'));
todoList.push(Todo(2, 'Get groceries', lorem, '2021.03.16', 'medium', true, 'Inbox'));
// zzzzzzzzzzzzzzzzzz

export const projects = {};

// define inbox as non enumerable property
Object.defineProperty(projects, 'Inbox', { value: todoList });
// zzzzzzzzzzzzzzzzzz

projects['Coding Camp'] = [];
projects['Vacation'] = [];

projects['Coding Camp'].push(Todo(0, 'Buy whiteboard and accessories', 'Preferrably 3x4 and markers', '2021.03.28', 'low', false, 'Coding Camp'));
projects['Coding Camp'].push(Todo(1, 'Buy notebooks', 'Preferrably white pages!', '2021.03.28', 'high', true, 'Coding Camp'));

// zzzzzzzzzzzzzzzzzz

export const addProject = (formData) => {
    const project = formData.get('project-name');
    projects[project] = [];
};

export const deleteProject = (name) => {
    delete projects[name];
};

export const addTodo = (formData) => {
    const todo = parseFormData(formData);
    const projectName = todo.project;
    projects[projectName].push(todo);
    console.log(projects);
};

export const updateTodo = (formData) => {
    const todo = parseFormData(formData);
    const projectName = todo.project;
    const index = getTodoIndex(projects[projectName], todo.id);

    todo.isChecked = projects[projectName][index].isChecked;
    projects[projectName][index] = todo;
}

export const deleteTodo = (id, projectName) => {
    projects[projectName].splice(getTodoIndex(projects[projectName], id), 1);
    console.log(projects);
}

// toggle priority, low -> med -> high
export const changePriority = (id, projectName) => {
    const index = getTodoIndex(projects[projectName], id);
    const currPriority = projects[projectName][index].priority;

    let newPriority = '';
    switch (currPriority) {
        case 'low':    newPriority = 'medium'; break;
        case 'medium': newPriority = 'high';   break;
        case 'high':   newPriority = 'low';    break;
    }

    projects[projectName][index].priority = newPriority;
};

// private helpers

const getTodoIndex = (todoList, id) => {
    return todoList.findIndex(todo => todo.id == id);
};

const parseFormData = (formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    const description = formData.get('description');
    const date = (formData.get('date'))? formData.get('date') : null;
    const id = Number((formData.get('id'))? formData.get('id') : nextTodoId++);
    const project = formData.get('project');
    return Todo(
            id,
            title,
            description,
            date,
            priority,
            false,
            project,
        );
}