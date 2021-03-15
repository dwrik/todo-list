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


export { todoList };