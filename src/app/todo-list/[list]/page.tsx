'use client'
import { useState, useEffect } from 'react';
import { fetchTodos } from '../../utils/api';
import { Todo } from "../../types/todo";

import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';
import CreateWindow from '../../components/CreateWindow';

interface Props {
    params: {
        list: string;
    };
}

const Page:React.FC<Props> = ({ params }) => {
    const page = params.list

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [createWin, setCreateWin] = useState<boolean>(false);
    const [list, setList] = useState<string[]>([]);

    useEffect(() => {
        fetchTodos()
            .then(data => {
                setTodoList(data.filter(a => a.list === page))
                setList(Array.from(new Set(data.map(a => a.list))))
                console.log('fetched')
            })
            .catch(error => console.error('Failed to fetch todos', error));
    }, []);

    
    // load the todo data from MockApi on page load using the useEffect hook


    return (
        <div className='flex flex-col overflow-hidden'>
            
            <Header page={page} list={list} />

            <div className='h-[84px]'></div>
            <Body list={list} todoList={todoList} setTodoList={setTodoList} />
            
            <Footer setCreateWin={setCreateWin} />

            <CreateWindow page={page} list={list} createWin={createWin} setTodoList={setTodoList} setCreateWin={setCreateWin}/>

        </div>
    )
}

export default Page;