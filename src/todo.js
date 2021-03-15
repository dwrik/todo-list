// Todo factory
const Todo = (id, title, description, dueDate, priority) => {
    return {
        id,
        title,
        description,
        dueDate,
        priority
    };
};

export const todoList = [];

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam facere nisi voluptatibus cumque fugiat. Repudiandae itaque at adipisci aspernatur et veritatis blanditiis a, quia suscipit recusandae non, aut ad!';

todoList.push(Todo(0, 'Dog food', lorem, null, 'high'));
todoList.push(Todo(1, 'Buy whiteboard and accessories', 'Preferrably 3x4 and markers', '2021.03.28', 'low'));
todoList.push(Todo(2, 'Get groceries', lorem, '2021.04.15', 'medium'));

export const addTodo = (formData) => {
    const todo = parseFormData(formData);
    todoList.push(todo);
    updateIds();
    console.log(todoList);
};

export const updateTodo = (formData) => {
    const todo = parseFormData(formData);
    todoList[todo.id] = todo;
}

export const deleteTodo = (id) => {
    todoList.splice(id, 1);
    updateIds();
    console.log(todoList);
}

export const changePriority = (id, priority) => {
    todoList[id].priority = priority;
};

const updateIds = () => {
    for (let index in todoList) {
        todoList[index].id = index;
    }
};

const parseFormData = (formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    const description = formData.get('description');
    const date = (formData.get('date'))? formData.get('date') : null;
    const id = (formData.get('id'))? formData.get('id') : todoList.length;
    return Todo(
            id,
            title,
            description,
            date,
            priority
        );
}