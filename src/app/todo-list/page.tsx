'use client'
import { useState, useEffect } from 'react';
import { createTodo, fetchTodos, deleteTodo } from '../utils/api';
import { Todo } from "../types/todo";

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

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodoList(prev => prev.filter(todo => todo.id !== id));
        } catch(error) {
            console.error('Failed to delete todo', error);
        };
    }

    return (
        <div>
            <button onClick={handleNewTodo}>
                Add a new task
            </button>
            <button onClick={() => handleDelete('22')}>
                Delete the 22. task
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
