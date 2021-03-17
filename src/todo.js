// Todo factory function
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

let nextValidID = 3;

// stores all lists/projects
export const projects = {};

// define inbox as non enumerable property of projects
Object.defineProperty(projects, 'Inbox', { value: [] });


// project operations

export const addProject = (formData) => {
    const project = formData.get('project-name');
    projects[project] = [];
};

export const deleteProject = (name) => {
    delete projects[name];
};


// todo operations

export const addTodo = (formData) => {
    const todo = parseFormData(formData);
    const projectName = todo.project;
    projects[projectName].push(todo);
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
}

// low => med => high
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
    const id = Number((formData.get('id'))? formData.get('id') : nextValidID++);
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