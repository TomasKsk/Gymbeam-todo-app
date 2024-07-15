'use client'
import { useState, useEffect } from 'react';
import { createTodo, fetchTodos, deleteTodo, updateTodo } from '../utils/api';
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

const testUpdate = {
    text: 'this is a changed text',
    tags: ['change', 'update']
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
            console.error(`Failed to update todo id: ${id}: `, error);
        };
    }

    const handleUpdate = async(id: string, fields: Partial<Todo>) => {
        try {
            const updatedTodo = await updateTodo(id, fields);
            setTodoList((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        } catch(error) {
            console.error(`Failed to update todo id: ${id}: `, error);
        };
    }

    return (
        <div className='flex flex-col'>
            <button onClick={handleNewTodo}>
                Add a new task
            </button>
            {/* <button onClick={() => handleDelete('22')}>
                Delete the 22. task
            </button> */}
            <button onClick={() => handleUpdate('19', testUpdate)}>
                Change the todo obj.19
            </button>
            <ul>
                {
                    todoList.map((obj,index) => {
                        return(
                            <li className='flex flex-row gap-4' key={`todo-item-${index}`}>
                                <p>{obj.id}</p>
                                <p>{obj.text}</p>
                                <p>{obj.complete}</p>
                                <p>{obj.priority}</p>
                                <p>{obj.duedate}</p>
                                <p>{obj.tags.join(', ')}</p>
                                <p>{obj.createdate}</p>
                                </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
