'use client'
import { useState, useEffect } from 'react';
import { createTodo, fetchTodos, deleteTodo, updateTodo } from '../utils/api';
import { Todo } from "../types/todo";
import { formatDate } from '../utils/date-functions';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CreateWindow from '../components/CreateWindow';

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



/*
todo
[] - make a loading page with suspense and a fallback
[] - change the date on fetch in the begining and the load function to convert the unix timestamp

*/

export default function Page() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [createWin, setCreateWin] = useState<boolean>(false);

    
    // load the todo data from MockApi on page load using the useEffect hook
    useEffect(() => {
        fetch('https://6694c02a4bd61d8314c873e2.mockapi.io/todo-item')
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map((todo: Todo) => ({
                    ...todo,
                    duedate: formatDate(todo.duedate),
                    createdate: formatDate(todo.createdate),
                }));
                setTodoList(formattedData);
            });
    }, []);

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
            
            <span className='fixed w-full top-0 z-10'>
                <Header />
            </span>
            <span className='invisible'>
                <Header />
            </span>

            <Body todoList={todoList} setTodoList={setTodoList} />
            
            <span className='fixed w-full bottom-0 z-10'>
                <Footer setCreateWin={setCreateWin} />
            </span>

            

            <CreateWindow createWin={createWin} setTodoList={setTodoList} setCreateWin={setCreateWin}/>

        </div>
    )
}
