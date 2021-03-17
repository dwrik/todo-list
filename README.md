# To-do

A minimalist *todo list*.

![To-do homepage](/screenshots/index.png)

## Usage

* **Inbox**: The default project.
* **Today**: Shows all of the todos irrespective of the project with a due date of the current day.
* **Upcoming**: Similar to *Today* but contains all todos with a due date after the current day.
* **Projects**: Contains projects created by the user.

**Disclaimer**: By default there is just a single project *Inbox*, where the user can store their todos. Todos cannot be added to the *Today* and *Upcoming* tabs as they are not projects. This is by design as their content is generated dynamically from all of the todos in the application based on their due dates. Thus any todo added when on *Today* or *Upcoming* will be saved in *Inbox*. Todos can only be added to projects (*Inbox* and *user created*)

 
## Features

* **Add Project**: Custom projects can be added by clicking the `+ New Project` button on the sidebar.

* **Add Todo**: To add a todo to a project, the user needs to create the project (if it doesn't already exist), visit the project by clicking on it and then using the add button to add the todo as usual. The todo will be added to the appropiate project.

* **Update Todo**: Todos can be updated by clicking the edit icon of the respective todo.

* **Delete Todo**: Deletion of todos is done by clicking the delete icon of the respective todo, which removes it from the project to which it belonged.

* **Toggle Priority**: Priority of the todos can be changed on the fly by clicking the flag icon of the respective todo. The toggling goes `low => medium => high` clockwise.

* **Toggle Details**: Todos can be expanded by clicking on them to reveal their details like description, due date in full format and priority. Expanded todos can be collapsed by clicking as well.

* **Mark as Checked**: Todos can be checked off by clicking the adjacent check circle.

The project implements `localStorage` api so your todos are stored locally on your device.

### Priority Key

| Priority | Color |
| -------- | :---: |
| Low      | Blue  |
| Medium   | Yellow|
| High     | Red   |

## Contribution

Contributions, issues, and feature requests are welcome!