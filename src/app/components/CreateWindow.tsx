import { useState } from "react";
import { Todo } from "../types/todo"
import { todayDate } from '../utils/date-functions';
import { createTodo, fetchTodos } from '../utils/api';

interface Props {
    page: string;
    list: string[];
    setList: React.Dispatch<React.SetStateAction<string[]>>;
    createWin: boolean;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCreateWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateWindow: React.FC<Props> = ({ page, list, setList, setTodoList, createWin, setCreateWin }) => {
    const [pageMenu, setPageMenu] = useState<boolean>(false)

    const [createForm, setCreateForm] = useState<Todo>({
        text: '',
        complete: false,
        priority: false,
        duedate: todayDate(),
        tags: [],
        createdate: todayDate(),
        checkdate: '',
        list: page,
        id: ''
    })
    

    const handleClose = () => {
        setCreateWin(false)
    };

    const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateForm(prev => ({
            ...prev,
            [key]: e.target.value
        }));    
    };

    const handleList = (key: string, e: React.ChangeEvent<HTMLInputElement> | string) => {
        if (typeof e === 'string') {
            setCreateForm(prev => ({
                ...prev,
                [key]: e
            }));    
        } else {
            setCreateForm(prev => ({
                ...prev,
                [key]: e.target.value.toLowerCase().replace(/[^a-z]+/i, '')
            }));
        }
    };

    const handleListChange = (key: string, value: string) => {
        handleList(key, value);
        setPageMenu(false)
    }

    const handleCheckBox = (key: keyof Todo) => {
        setCreateForm(prev => ({
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
        setCreateForm(prev => ({
            ...prev,
            tags: tags
        }));
    }

    // on blur filter out the empty array items
    const handleTagsSplitting = () => {
        const tags = createForm.tags.filter(a => a.length > 0)
        setCreateForm(prev => ({
            ...prev,
            tags: tags
        }));
    }

    const handleNewTodo = async () => {
        await createTodo(createForm);
        const updatedTodos = await fetchTodos();
        setList(Array.from(new Set(updatedTodos.map(a => a.list))))
        setTodoList(updatedTodos.filter(a => a.list === page));
    };

    const handleSave = () => {
        if (createForm.text.length === 0) {
            alert('you cant have a todo item with no text')
            return
        }
        
        handleNewTodo();
        handleClose();
            
        setCreateForm(prev => ({
            ...prev,
            text: '',
            complete: false,
            priority: false,
            tags: [],
            checkdate: '',
            list: page,
            id: ''
        }));
    };

    return (
        <div style={{height: !createWin ? '0px' : '500px', transitionProperty: 'height, opacity', visibility: !createWin ? 'hidden' : 'visible'}} className="duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-[600px] w-[95%] bg-gray-300 rounded-xl shadow-xl outline outline-1 border-4 border-gray-300 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            <div className="flex flex-row w-full items-center justify-between text-gray-100 outline outline-5 outline-gray-900 bg-gray-900 rounded-t-lg">
                <h2 className="flex flex-col text-lg font-semibold items-center flex-grow py-2 px-4">
                    Create a new todo Item
                </h2>
                <button className="font-black text-xl p-2" onClick={handleClose}>
                    X
                </button>
            </div>

            <div style={{padding: !createWin ? '0' : '0.75rem', display: !createWin ? 'none' : 'block'}} className="flex flex-col">
                {/* {todo ? todo.id : 'Loading...'} */}
                {
                    createForm ?
                        <div className="flex flex-col gap-8 items-center">
                            <input 
                                type="text"
                                placeholder="eg. Buy carrots"
                                value={createForm.text}
                                onChange={(e) => handleChange('text', e)}
                                onKeyDown={handleKeyDown}
                                style={{padding: !createWin ? '0' : '0.75rem'}}
                                className="w-full flex rounded-md bg-gray-100 text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                            />

                            <div className="flex flex-row w-full items-center justify-around text-xl">
                                {/* priority checkbox */}
                                <button 
                                    style={{backgroundColor: createForm.priority ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}} 
                                    className="px-6 py-3 bg-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                    onClick={() => handleCheckBox('priority')}
                                >
                                    Priority
                                </button>

                                {/* complete checkbox */}
                                <button 
                                    style={{backgroundColor: createForm.complete ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}} 
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
                                    value={createForm.duedate}
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
                                    placeholder="eg. shopping, health, carrots"
                                    type="text"
                                    value={createForm.tags}
                                    onChange={(e) => handleTags(e.target.value)}
                                    onBlur={handleTagsSplitting}
                                    onKeyDown={handleKeyDown}
                                    className="w-full flex px-3 py-2 rounded-md bg-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                                />
                            </div>

                            <div className="flex flex-row w-full items-center justify-around text-md gap-2">
                                <label htmlFor="list">
                                    List
                                </label>
                                <input 
                                    id="list"
                                    type="text"
                                    placeholder={`eg. ${page}`}
                                    value={createForm.list}
                                    onChange={(e) => handleList('list', e)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full flex px-3 py-2 rounded-md bg-gray-100 text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                                />

                                <div className="relative">
                                    <button style={{transform: pageMenu ? 'rotate(0deg)' : 'rotate(90deg'}} className="" onClick={() => setPageMenu(prev => !prev)}>
                                        v
                                    </button>

                                    <div style={{maxHeight: pageMenu ? '100px' : '0px', border: ` ${pageMenu ? '1px solid rgba(0,0,0,0.8)' : '0px solid rgba(0,0,0,0)'}`}} 
                                        className="overflow-scroll duration-300 absolute z-10 right-0 px-4 bg-gray-100 shadow-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
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
                            
                            <button onClick={handleSave} className="absolute px-6 py-2 rounded-md bottom-4 bg-white shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                Create Todo Item
                            </button>
                        </div>
                    : 'Loading...'
                }
            </div>
        </div>
    )
};

export default CreateWindow;