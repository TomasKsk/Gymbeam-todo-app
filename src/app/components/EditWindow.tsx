import { Todo } from "../types/todo";
import { useState, useEffect } from "react";

interface Editing {
    win: boolean,
    id: string
}

interface Props {
    todo?: Todo,
    editingTodo: Editing,
    setEditingTodo: React.Dispatch<React.SetStateAction<Editing>>
}


/*
export interface Todo {
    text: string;
    complete: boolean;
    priority: boolean;
    duedate: string;
    tags: string[];
    createdate: string;
    id: string;
}
*/

const EditWindow: React.FC<Props> = ({ todo, editingTodo, setEditingTodo }) => {
    const [form, setForm] = useState<Todo>({
        text: '',
        complete: false,
        priority: false,
        duedate: '',
        tags: [],
        createdate: '',
        id: ''
    });

    useEffect(() => {
        if (todo) {
            setForm(todo);
        }
    }, [todo]);

    const handleClose = () => {
        setEditingTodo({
            win: false,
            id: ''
        })
    };

    const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }

    const handleCheckBox = (key: keyof Todo) => {
        setForm(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const inputElement = e.currentTarget as HTMLInputElement;
            inputElement.blur();
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[70%] bg-white rounded-xl p-4 shadow-lg">
            <div className="flex flex-row w-full items-center justify-between mb-4">
                <h2 className="flex flex-col text-lg font-semibold items-center flex-grow">
                    Edit your todo no: {editingTodo.id}
                </h2>
                <button className="font-black text-xl" onClick={handleClose}>
                    X
                </button>
            </div>

            <div className="flex flex-col">
                {/* {todo ? todo.id : 'Loading...'} */}
                {
                    form ?
                        <div className="flex flex-col gap-4 items-center ">
                            <input 
                                type="text"
                                value={form.text}
                                onChange={(e) => handleChange('text', e)}
                                onKeyDown={handleKeyDown}
                                className="w-full flex px-3 rounded-md py-2 bg-gray-200"
                            />

                            {/* priority checkbox */}
                            <div className="flex flex-row w-full items-center justify-around text-xl">
                                <label htmlFor="priorityCheckbox">
                                    Priority
                                </label>
                                <input className="size-[20px]" 
                                    id="priorityCheckbox"
                                    type="checkbox"
                                    checked={form.priority}
                                    onChange={() => handleCheckBox('priority')}
                                />
                            </div>

                            {/* complete checkbox */}
                            <div className="flex flex-row w-full items-center justify-around text-xl">
                                <label htmlFor="completeCheckbox">
                                    Complete
                                </label>
                                <input className="size-[20px]" 
                                    id="completeCheckbox"
                                    type="checkbox"
                                    checked={form.complete}
                                    onChange={() => handleCheckBox('complete')}
                                />
                            </div>


                            <button className="absolute px-6 py-2 rounded-md bottom-4 bg-gray-300">
                                Save Changes
                            </button>
                        </div>
                    : 'Loading...'
                }
            </div>
        </div>
    )
};

export default EditWindow;