import { useState, useEffect } from "react";
import { fetchTodos } from "../utils/api";
import { Todo } from "../types/todo";

export default function Header() {
    const date = new Date();
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [list, setList] = useState<string[]>([]);

    useEffect(() => {
        fetchTodos()
            .then(data => {
                setTodoList(data)
                setList([...new Set(data.map(a => a.list))])
            })
            .catch(error => console.error('Failed to fetch todos', error));
    }, []);

    return (
        <div className="fixed w-full top-0 flex flex-col px-2 pb-2 z-10 items-center bg-gray-100 shadow-lg drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            <h1 className="text-3xl text-gray-900 font-bold pb-2">
                Your Todos
            </h1>
            <div className="absolute top-2 left-2 w-full text-left">
                {`${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })}`}
            </div>
            <div className="flex w-full text-lg">
                {
                    list.length > 1 ?
                        <>
                        </>
                    :
                        <>
                            <span className="absolute w-full">
                                On list: 
                            </span>
                            <span className="flex flex-row w-full items-center justify-center center pl-4 font-bold">
                                {list[0].toUpperCase()}
                            </span>
                        </>
                }
            </div>
        </div>
    )
}
