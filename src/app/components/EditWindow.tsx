import { Todo } from "../types/todo";
import { useState, useEffect } from "react";
import { fetchTodos, updateTodo } from '../utils/api';

interface Editing {
    win: boolean,
    id: string
}

interface Editing {
    win: boolean,
    id: string
}

interface Props {
    todo?: Todo,
    editingTodo: Editing,
    setEditingTodo: React.Dispatch<React.SetStateAction<Editing>>
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EditWindow: React.FC<Props> = ({ todo, setTodoList, editingTodo, setEditingTodo }) => {
    const [form, setForm] = useState<Todo>({
        text: '',
        complete: false,
        priority: false,
        duedate: '',
        tags: [],
        createdate: '',
        checkdate: '',
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
        });
    };

    const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

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
    };

    const handleTags = (e: string) => {
        // auto replace white space and # character with ,
        const tags = e.replace(/\s|#/g, ',').split(',').map(a => a.trim())
        console.log(tags)
        setForm(prev => ({
            ...prev,
            tags: tags
        }));
    }

    // on blur filter out the empty array items
    const handleTagsSplitting = () => {
        const tags = form.tags.filter(a => a.length > 0)
        setForm(prev => ({
            ...prev,
            tags: tags
        }));
    }
 
    const handleUpdate = async(id: string, fields: Partial<Todo>) => {
        try {
            const updatedTodo = await updateTodo(id, fields);
            setTodoList((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));

            fetchTodos()
                .then(data => setTodoList(data))
                .catch(error => console.error('Failed to fetch todos', error));
                
        } catch(error) {
            console.error(`Failed to update todo id: ${id}: `, error);
        };
    }

    const handleSave = (id: string) => {
        handleUpdate(id, form);
        handleClose();
    }

    return (
        <div style={{height: !editingTodo.win ? '0px' : '500px', transitionProperty: 'height, opacity', visibility: !editingTodo.win ? 'hidden' : 'visible'}} className="overflow-hidden duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] bg-gray-300 rounded-xl shadow-xl outline outline-1 border-4 border-gray-300 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            <div className="flex flex-row w-full items-center justify-between text-gray-100 outline outline-5 outline-gray-900 bg-gray-900 rounded-t-lg">
                <h2 className="flex flex-col text-lg font-semibold items-center flex-grow py-2 px-4">
                    Edit your todo
                </h2>
                <button className="font-black text-xl p-2" onClick={handleClose}>
                    X
                </button>
            </div>

            <div className="flex flex-col">
                {/* {todo ? todo.id : 'Loading...'} */}
                {
                    form ?
                        <div className="flex flex-col gap-8 items-center">
                            <input 
                                type="text"
                                value={form.text}
                                onChange={(e) => handleChange('text', e)}
                                onKeyDown={handleKeyDown}
                                className="w-full flex px-4 py-3 rounded-md bg-gray-100 text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                            />

                            <div className="flex flex-row w-full items-center justify-around text-xl">
                                {/* priority checkbox */}
                                <button 
                                    style={{backgroundColor: form.priority ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}} 
                                    className="px-6 py-3 bg-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                    onClick={() => handleCheckBox('priority')}
                                >
                                    Priority
                                </button>

                                {/* complete checkbox */}
                                <button 
                                    style={{backgroundColor: form.complete ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}} 
                                    className="px-6 py-3 bg-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                    onClick={() => handleCheckBox('complete')}
                                >
                                    Complete
                                </button>
                            </div>

                            {/* Due Date input */}
                            <div className="flex flex-row w-full items-center justify-around text-xl ">
                                <label htmlFor="dueDate">
                                    Due Date:
                                </label>
                                <input
                                    id="dueDate"
                                    type="date"
                                    value={form.duedate}
                                    onChange={(e) => handleChange('duedate',e)}
                                    className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] px-2 py-1 rounded-md"
                                />
                            </div>
                            
                            <div className="flex flex-row w-full items-center justify-around text-md gap-2">
                                <label htmlFor="tagsArray">
                                    #Tags
                                </label>
                                <input
                                    id="tagsArray"
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) => handleTags(e.target.value)}
                                    onBlur={handleTagsSplitting}
                                    onKeyDown={handleKeyDown}
                                    className="w-full flex px-3 py-2 rounded-md bg-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                                />
                            </div>
                            
                            <div className="invisible px-6 py-2 rounded-md bottom-4 bg-gray-300">
                                Save Changes
                            </div>

                            <button onClick={() => handleSave(form.id)} className="absolute px-6 py-2 rounded-md bottom-4 bg-white shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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