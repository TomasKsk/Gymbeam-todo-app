'use client'
import { todo } from 'node:test';
import { useState, useEffect } from 'react';

// types of todo item
interface Todo {
    text: string;
    complete: boolean;
    priority: boolean;
    duedate: number;
    tags: string[];
    createdate: number;
    id: string;
}

export default function page() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    
    useEffect(() => {
        fetch('https://6694c02a4bd61d8314c873e2.mockapi.io/todo-item')
        .then(res => res.json())
        .then(data => setTodoList(data));
    },[])

    return (
        <div>
            <ul>
                {
                    todoList.map((obj,index) => {
                        return(
                            <li key={`todo-item-${index}`}>
                                {obj.text}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
