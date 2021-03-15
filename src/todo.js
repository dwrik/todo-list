// Todo factory
const Todo = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority
    };
};

export const todoList = [];

const PRIORITY_LOW = 'low';
const PRIORITY_MEDIUM = 'medium';
const PRIORITY_HIGH = 'high';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam facere nisi voluptatibus cumque fugiat. Repudiandae itaque at adipisci aspernatur et veritatis blanditiis a, quia suscipit recusandae non, aut ad!';

todoList.push(Todo('Dog food', lorem, null, PRIORITY_HIGH));
todoList.push(Todo('Buy whiteboard and accessories', 'Preferrably 3x4 and markers', '2021.03.28', PRIORITY_LOW));
todoList.push(Todo('Get groceries', lorem, '2021.04.15', PRIORITY_MEDIUM));

export const addTodo = (formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    const description = formData.get('description');
    const date = (formData.get('date'))? formData.get('date') : null;

    todoList.push(
        Todo(
            title,
            description,
            date,
            priority
        ));

    console.log(todoList);
};