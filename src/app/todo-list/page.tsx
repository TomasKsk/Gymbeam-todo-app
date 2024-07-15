'use client'
import { useState, useEffect } from 'react';
import { createTodo, fetchTodos } from '../utils/api';

// types of todo item
interface Todo {
    text: string;
    complete: boolean;
    priority: boolean;
    duedate: string;
    tags: string[];
    createdate: string;
    id: string;
}

const genDueDate = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 3)).toISOString().slice(0,10);
}

const testTodo = {
    text: 'testing add todo',
    complete: false,
    priority: false,
    duedate: genDueDate(),
    tags: ['test', 'testing'],
    createdate: new Date().toISOString().slice(0,10),
    id: new Date().valueOf() // create a unique number using date and time
}

export default function Page() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    
    // load the todo data from MockApi on page load using the useEffect hook
    useEffect(() => {
        fetch('https://6694c02a4bd61d8314c873e2.mockapi.io/todo-item')
        .then(res => res.json())
        .then(data => setTodoList(data));
    },[]);

    const handleNewTodo = async () => {
        await createTodo(testTodo);
        const updatedTodos = await fetchTodos();
        setTodoList(updatedTodos);
    };

    return (
        <div>
            <button onClick={handleNewTodo}>
                Add a new task
            </button>
            <ul>
                {
                    todoList.map((obj,index) => {
                        return(
                            <li key={`todo-item-${index}`}>
                                {obj.id}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
