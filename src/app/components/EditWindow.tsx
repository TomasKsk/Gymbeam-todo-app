import { Todo } from "../types/todo";
import { useState, useEffect } from "react";
import { fetchTodos, updateTodo } from '../utils/api';

interface Editing {
    win: boolean,
    id: string
}

interface Props {
    list: string[];
    setList: React.Dispatch<React.SetStateAction<string[]>>
    todo?: Todo;
    page: string;
    editingTodo: Editing;
    setEditingTodo: React.Dispatch<React.SetStateAction<Editing>>;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EditWindow: React.FC<Props> = ({ list, setList, todo, page, setTodoList, editingTodo, setEditingTodo }) => {
    const [pageMenu, setPageMenu] = useState<boolean>(false)
    const [form, setForm] = useState<Todo>({
        text: '',
        complete: false,
        priority: false,
        duedate: '',
        tags: [],
        createdate: '',
        checkdate: '',
        list: '',
        id: ''
    });

    useEffect(() => {
        if (todo) {
            setForm(todo);
        }
    }, [todo]);

    useEffect(() => {
        console.log(form)
    },[form])

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
        const tags = e.replace(/\s+|#/g, ',').split(',').map(a => a.trim())
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

            const fetchedTodos = await fetchTodos();
            setList(Array.from(new Set(fetchedTodos.map(a => a.list))));
            setTodoList(fetchedTodos.filter(a => a.list === page));
                
        } catch(error) {
            console.error(`Failed to update todo id: ${id}: `, error);
        };
    }

    const handleSave = (id: string) => {
        if (form.text.length === 0 || form.list.length === 0) {
            alert('you cant have a todo item with no text')
            return
        }
        
        handleUpdate(id, form);
        handleClose();
    }

    const handleList = (key: string, e: React.ChangeEvent<HTMLInputElement> | string) => {
        if (typeof e === 'string') {
            setForm(prev => ({
                ...prev,
                [key]: e
            }));    
        } else {
            setForm(prev => ({
                ...prev,
                [key]: e.target.value.toLowerCase().replace(/[^a-z]+/i, '')
            }));
        }
    };

    const handleListChange = (key: string, value: string) => {
        handleList(key, value);
        setPageMenu(false)
    }

    return (
        <div
            style={{
                height: !editingTodo.win ? '0px' : '540px',
                transitionProperty: 'height, opacity',
                visibility: !editingTodo.win ? 'hidden' : 'visible'
            }}
            className="overflow-hidden duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-[600px] w-[95%] dark:bg-gray-600 bg-gray-300 rounded-xl shadow-xl outline outline-1 border-4 dark:border-gray-600 border-gray-300 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]"
        >
            <div className="flex flex-row w-full items-center justify-between text-gray-100 outline outline-5 outline-gray-900 bg-gray-900 rounded-t-lg">
                <h2 className="flex flex-col text-lg font-semibold items-center flex-grow py-2 px-4">
                    Edit your todo
                </h2>
                <button className="font-black text-xl p-2" onClick={handleClose}>
                    X
                </button>
            </div>

            <div className="flex flex-col p-4">
                {
                    form ?
                        <div className="flex flex-col gap-8 items-center">
                            <input 
                                type="text"
                                value={form.text}
                                onChange={(e) => handleChange('text', e)}
                                onKeyDown={handleKeyDown}
                                className="w-full flex px-4 py-3 rounded-md dark:text-gray-200 dark:bg-gray-500 bg-gray-100 text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                            />

                            <div className="flex flex-row w-full items-center justify-around text-xl">
                                {/* priority checkbox */}
                                <button 
                                    className={`px-6 py-3 bg-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${!form.priority ? 'dark:bg-gray-500 bg-gray-100' : 'dark:bg-yellow-600 bg-yellow-500'}`}
                                    onClick={() => handleCheckBox('priority')}
                                >
                                    Priority
                                </button>

                                {/* complete checkbox */}
                                <button 
                                    className={`px-6 py-3 bg-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${!form.complete ? 'dark:bg-gray-500 bg-gray-100' : 'dark:bg-yellow-600 bg-yellow-500'}`}
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
                                    onChange={(e) => handleChange('duedate', e)}
                                    className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] dark:text-gray-200 dark:bg-gray-500 px-2 py-1 rounded-md"
                                />
                            </div>
                            
                            <div className="flex flex-row w-full items-center justify-around text-md gap-2">
                                <label htmlFor="tagsArray">
                                    #Tags
                                </label>
                                <input
                                    id="tagsArray"
                                    type="text"
                                    value={form.tags.join(',')}
                                    onChange={(e) => handleTags(e.target.value)}
                                    onBlur={handleTagsSplitting}
                                    onKeyDown={handleKeyDown}
                                    className="w-full flex px-3 py-2 rounded-md dark:bg-gray-500 dark:text-gray-200 bg-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                                />
                            </div>

                            {/* list input */}
                            <div className="flex flex-row w-full items-center justify-around text-md gap-2">
                                <label htmlFor="list">
                                    List
                                </label>
                                <input 
                                    id="list"
                                    type="text"
                                    value={form.list}
                                    onChange={(e) => handleList('list', e)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full flex px-3 py-2 rounded-md dark:bg-gray-500 dark:text-gray-200 bg-gray-100 text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                                />

                                <div className="relative">
                                    <button style={{transform: pageMenu ? 'rotate(0deg)' : 'rotate(90deg'}} className="cursor-pointer" onClick={() => setPageMenu(prev => !prev)}>
                                        v
                                    </button>

                                    <div style={{maxHeight: pageMenu ? '100px' : '0px', border: ` ${pageMenu ? '1px solid rgba(0,0,0,0.8)' : '0px solid rgba(0,0,0,0)'}`}} 
                                        className="overflow-scroll duration-300 absolute z-10 right-0 px-4 dark:bg-gray-600 bg-gray-100 shadow-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                    >
                                        <ul>
                                            {
                                                list.map((obj,idx) => {
                                                    return(
                                                        <li onClick={() => handleListChange('list', obj)} key={`list-selection-${idx}`}>
                                                            {obj}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="invisible px-6 py-2 rounded-md bottom-4  bg-gray-300">
                                Save Changes
                            </div>

                            <button onClick={() => handleSave(form.id)} className="absolute px-6 py-2 rounded-md bottom-4 dark:bg-gray-500 dark:text-gray-200 bg-white shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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