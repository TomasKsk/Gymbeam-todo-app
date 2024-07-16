'use client'
import { useState, useEffect } from 'react';
import { fetchTodosV2 } from '../../utils/api';
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
    const list = params.list

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [createWin, setCreateWin] = useState<boolean>(false);

    
    // load the todo data from MockApi on page load using the useEffect hook
    useEffect(() => {
        fetchTodosV2(list)
            .then(data => setTodoList(data))
            .catch(error => console.error('Failed to fetch todos', error));
    }, []);

    return (
        <div className='flex flex-col'>
            
            <Header />

            <Body todoList={todoList} setTodoList={setTodoList} />
            
            <Footer setCreateWin={setCreateWin} />

            <CreateWindow createWin={createWin} setTodoList={setTodoList} setCreateWin={setCreateWin}/>

        </div>
    )
}

export default Page;