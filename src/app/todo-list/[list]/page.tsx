'use client'
import { useState, useEffect, useCallback } from 'react';
import { deleteTodo, fetchTodos } from '../../utils/api';
import { SelectSwitch, Todo } from "../../types/todo";
import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';
import CreateWindow from '../../components/CreateWindow';
import { useRouter } from 'next/navigation';

interface Props {
    params: {
        list: string;
    };
}

const Page: React.FC<Props> = ({ params }) => {
    const page = params.list;
    const router = useRouter();

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [createWin, setCreateWin] = useState<boolean>(false);
    const [list, setList] = useState<string[]>([]);
    const [selectSwitch, setSelectSwitch] = useState<SelectSwitch>({
        multi: false,
        all: false,
        del: false,
        edit: false,
        multiSelectItems: []
    });

    const fetchData = async () => {
        try {
            const data = await fetchTodos();
            setTodoList(data.filter(a => a.list === page));
            setList(Array.from(new Set(data.map(a => a.list))));
        } catch (error) {
            console.error('Failed to fetch todos', error);
        }
    };

    const handleBulkDelete = useCallback(async () => {
        var result = confirm("Are you sure you want to delete all selected items?");
        if (result) {
            try {
                await Promise.all(selectSwitch.multiSelectItems.map(id => deleteTodo(id)));
                fetchData();
                setSelectSwitch(prev => ({
                    ...prev,
                    all: false,
                    multi: false,
                    del: false,
                    multiSelectItems: []
                }));
            } catch (error) {
                console.error("Failed to delete selected todos: ", error);
            }
        }
    }, [selectSwitch.multiSelectItems]);

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        if (selectSwitch.del && selectSwitch.multiSelectItems.length > 0) {
            handleBulkDelete();
        }
    }, [selectSwitch.del, selectSwitch.multiSelectItems, handleBulkDelete]);

    useEffect(() => {
        if (selectSwitch.all && selectSwitch.multi) {
            setSelectSwitch(prev => ({
                ...prev,
                multi: false,
                all: true,
                multiSelectItems: todoList.map(a => a.id)
            }));   
        }

        if (todoList.length === 0 && list.length > 0) {
            router.push('main');
        }
    }, [selectSwitch.all, selectSwitch.multi, todoList, list, page, router]);

    return (
        <div className='flex flex-col dark:bg-gray-500 bg-gray-300'>
            <Header page={page} list={list} />
            <div className='h-[84px]'></div>
            <Body selectSwitch={selectSwitch} setSelectSwitch={setSelectSwitch} setList={setList} list={list} page={page} todoList={todoList} setTodoList={setTodoList} />
            <Footer todoList={todoList} selectSwitch={selectSwitch} setSelectSwitch={setSelectSwitch} setCreateWin={setCreateWin} />
            <CreateWindow page={page} list={list} setList={setList} createWin={createWin} setTodoList={setTodoList} setCreateWin={setCreateWin}/>

        </div>
    );
};

export default Page;
