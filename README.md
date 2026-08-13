# Advanced Todo Application

A responsive task-management application built with **Next.js, React, TypeScript and Tailwind CSS** as a technical interview assignment for GymBeam.

The application was designed and implemented within a **3-day development time limit** as part of the recruitment process.

Given the limited development time, I focused on delivering a functional application with CRUD operations, multiple task lists, priorities, tags, due dates, bulk operations, responsive UI and remote data persistence through a REST API.

---

## Features

### Task Management

- Create new todo items
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Set tasks as priority
- Assign due dates
- Add multiple tags
- Track task creation dates
- Track task completion dates

### Multiple Todo Lists

Tasks can be organized into separate custom lists.

Each list has its own dynamically generated route:

```text
/todo-list/[list]
```
The current list is derived from the URL and the fetched task data is filtered accordingly.  
This allows the same application logic and UI components to be reused across multiple independent task lists.

### Bulk Operations

The application includes a multi-selection mode that allows users to:

* select individual tasks
* select all tasks in the current list
* delete multiple selected tasks at once

Bulk deletion is performed asynchronously using Promise.all().  

### Responsive Interface  
The UI adapts to both desktop and mobile layouts.  

On larger screens, available todo lists are displayed in a sidebar while the main area contains the tasks.  

On smaller screens, the layout adapts to the available viewport and the main controls are positioned for easier mobile use.  

### Light and Dark Themes
The application supports both light and dark UI themes.  


## Tech Stack
* Next.js 14
* React 18
* TypeScript
* Tailwind CSS
* Next.js App Router
* REST API
* MockAPI  

## Application Structure
The project separates reusable UI components, TypeScript models and API/helper functions.  

```
src/app/
├── components/
│   ├── AddButton.tsx
│   ├── Body.tsx
│   ├── CreateWindow.tsx
│   ├── EditMultipleWindow.tsx
│   ├── EditWindow.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ThemeToggle.tsx
│   └── TodoItem.tsx
│
├── todo-list/
│   └── [list]/
│       └── page.tsx
│
├── types/
│   └── todo.ts
│
├── utils/
│   ├── api.ts
│   ├── date-functions.ts
│   └── data-backup.json
│
├── layout.tsx
└── page.tsx  

```
## TypeScript Data Model
Each todo item is represented by a TypeScript interface containing both task data and metadata.

```typescript
export interface Todo {
    text: string;
    complete: boolean;
    priority: boolean;
    duedate: string;
    tags: string[];
    createdate: string;
    checkdate: string;
    id: string;
    list: string;
}
```
The application also uses a separate state model for multi-selection operations:
```typescript
export interface SelectSwitch {
    multi: boolean;
    all: boolean;
    del: boolean;
    edit: boolean;
    multiSelectItems: string[];
}
```

## REST API
Todo data is persisted remotely using MockAPI.  

The API communication is separated from the UI components into a dedicated utility module.  

The data layer provides functions for:
```javascript
fetchTodos()
createTodo()
updateTodo()
deleteTodo()
```
The application uses the standard REST operations:  
```
GET     Fetch todo items
POST    Create a todo item
PUT     Update a todo item
DELETE  Delete a todo item
```  
Keeping API communication separate from the UI makes the data layer easier to replace or extend without restructuring the React components.  

## Data Flow
When the application loads a todo list, it fetches the available tasks from the REST API.  
The current list is determined from the dynamic URL parameter:
```
/todo-list/[list]
```
The returned data is then filtered for the selected list and stored in React state.  

After create, update or delete operations, the affected application state is refreshed so the UI remains synchronized with the remote data.  

## Creating Tasks
A new task can contain:  

* task text
* priority state
* completion state
* due date
* tags
* target list
* creation date

Users can either assign the task to the currently active list or select another available list.  
Tags entered with spaces, commas or # characters are converted into a normalized array of tag values.  

## Editing Tasks
Existing todo items can be modified without creating a new record.  

The application uses partial TypeScript updates when only selected fields need to change.  

For example, completing a task updates its completion status and completion date without replacing the entire todo object.  

## Tesk Ordering  
Fetched todo items are processed before being displayed.  

The application prioritizes:  

* unfinished tasks over completed tasks
* priority tasks over standard tasks  

This keeps more relevant items visible first.  

## Bulk Selection

The application maintains a separate selection state containing the IDs of currently selected todo items.  

Users can enter selection mode and select individual items, or select the entire current list.  

Bulk deletion then executes the API calls concurrently:  

```javascript
await Promise.all(
    selectedItems.map(id => deleteTodo(id))
);
```

After the operation is complete, the task list is refreshed and the selection state is reset.  

## Responsive Design
The interface was designed to work on different screen sizes.  

Desktop  
* persistent todo-list navigation
* multi-column task layout
* controls positioned around the main workspace  
Mobile  
* single-column task layout
* navigation adapted to smaller screens
* fixed bottom controls for common operations

Tailwind responsive utility classes are used to adapt the interface based on viewport size.  

## Running the Project Locally
Requirements  
* Node.js
* npm

Clone the repository:
```bash
git clone https://github.com/TomasKsk/Gymbeam-todo-app.git
```
Enter the project directory:
```bash
cd Gymbeam-todo-app
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
Then open:
```bash
http://localhost:3000
```

## Project Context

**This project was created as a technical interview assignment for GymBeam and was implemented within a 3-day development window.**  
  

The goal was to design and deliver a working todo application while making my own decisions regarding application structure, component organization, TypeScript models, REST API communication and user interaction.  

Within the available time I implemented:

* full CRUD functionality
* multiple independent todo lists
* dynamic routing between lists
* task priorities
* due dates
* tags and task metadata
* creation and completion tracking
* bulk task selection
* bulk deletion
* responsive desktop and mobile layouts
* light and dark themes
* remote persistence through a REST API  

The project represents a time-boxed technical assignment rather than a long-term production application.  
  
Because of the three-day deadline, I prioritized delivering the required functionality and a usable application over additional engineering work such as automated testing and further architectural refinement.  

## What I Would Improve Next
With additional development time, I would focus on:  

* automated unit and component testing
* integration testing for CRUD workflows
* improved loading states
* clearer API error feedback in the UI
* form validation
* accessibility improvements
* further component refactoring
* more structured server-state management
* authentication
* user-specific todo lists
* CI/CD workflow
* deployment configuration  

A future version could also move remote server state into a dedicated solution such as TanStack Query, reducing the amount of manual fetching and synchronization logic inside the React components.  

## What This Project Demonstrates
The project demonstrates practical experience with:  

* React component architecture
* TypeScript models and props
* React state management
* asynchronous JavaScript
* REST API integration
* CRUD operations
* dynamic routing with Next.js
* responsive UI development
* reusable components
* data transformation and filtering
* bulk asynchronous operations
* working within a strict delivery deadline
