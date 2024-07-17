'use client'
import { useState, useEffect } from 'react';
import { fetchTodos } from '../../utils/api';
import { SelectSwitch, Todo } from "../../types/todo";

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
    const [selectSwitch, setSelectSwitch] = useState<SelectSwitch>({
        multi: false,
        all: false,
        multiSelectItems: []
    });

    useEffect(() => {
        fetchTodos()
            .then(data => {
                setTodoList(data.filter(a => a.list === page))
                setList(Array.from(new Set(data.map(a => a.list))))
                console.log('fetched')
            })
            .catch(error => console.error('Failed to fetch todos', error));
    }, []);

    useEffect(() => {


        if (selectSwitch.all && selectSwitch.multi) {
            setSelectSwitch(prev => ({
                ...prev,
                multi: false,
                all: true,
                multiSelectItems: todoList.map(a => a.id)
            }));   
        }
    }, [])

    
    // load the todo data from MockApi on page load using the useEffect hook


    return (
        <div className='flex flex-col overflow-hidden'>
            
            <Header page={page} list={list} />

            <div className='h-[84px]'></div>
            <Body selectSwitch={selectSwitch} setSelectSwitch={setSelectSwitch} setList={setList} list={list} page={page} todoList={todoList} setTodoList={setTodoList} />
            
            <Footer selectSwitch={selectSwitch} setSelectSwitch={setSelectSwitch} setCreateWin={setCreateWin} />

            <CreateWindow page={page} list={list} setList={setList} createWin={createWin} setTodoList={setTodoList} setCreateWin={setCreateWin}/>

        </div>
    )
}

export default Page;