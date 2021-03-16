const Todo = (id, title, description, dueDate, priority, isChecked) => {
    return {
        id,
        title,
        description,
        dueDate,
        priority,
        isChecked,
    };
};

let nextValidId = 3;

export const todoList = [];

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam facere nisi voluptatibus cumque fugiat. Repudiandae itaque at adipisci aspernatur et veritatis blanditiis a, quia suscipit recusandae non, aut ad!';

todoList.push(Todo(0, 'Dog food', lorem, '2021.03.15', 'high', false));
todoList.push(Todo(1, 'Buy whiteboard and accessories', 'Preferrably 3x4 and markers', '2021.03.28', 'low', false));
todoList.push(Todo(2, 'Get groceries', lorem, '2021.03.16', 'medium', true));

export const addTodo = (formData) => {
    const todo = parseFormData(formData);
    todoList.push(todo);
    console.log(todoList);
};

export const updateTodo = (formData) => {
    const todo = parseFormData(formData);
    const index = getTodoIndex(todo.id);
    todo.isChecked = todoList[index].isChecked;
    todoList[index] = todo;
}

export const deleteTodo = (id) => {
    todoList.splice(getTodoIndex(id), 1);
    console.log(todoList);
}

// toggle priority, low -> med -> high
export const changePriority = (id) => {
    const index = getTodoIndex(id);
    const currPriority = todoList[index].priority;
    switch (currPriority) {
        case 'low':    todoList[index].priority = 'medium'; break;
        case 'medium': todoList[index].priority = 'high';   break;
        case 'high':   todoList[index].priority = 'low';    break;
    }
};

// private helpers

const getTodoIndex = (id) => {
    return todoList.findIndex(todo => todo.id == id);
};

const parseFormData = (formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    const description = formData.get('description');
    const date = (formData.get('date'))? formData.get('date') : null;
    const id = (formData.get('id'))? formData.get('id') : nextValidId++;
    return Todo(
            id,
            title,
            description,
            date,
            priority,
            false,
        );
}