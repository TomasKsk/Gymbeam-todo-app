'use client'
import { useState, useEffect } from 'react';
import { fetchTodos } from '../utils/api';
import { Todo } from "../types/todo";

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CreateWindow from '../components/CreateWindow';

export default function Page() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [createWin, setCreateWin] = useState<boolean>(false);

    
    // load the todo data from MockApi on page load using the useEffect hook
    useEffect(() => {
        fetchTodos()
            .then(data => setTodoList(data))
            .catch(error => console.error('Failed to fetch todos', error));
    }, []);

    return (
        <div className='flex flex-col'>
            
            <span className='fixed w-full top-0 z-10'>
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
