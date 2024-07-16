import { useState } from "react";
import { Todo } from "../types/todo"
import { todayDate } from '../utils/date-functions';
import { createTodo, fetchTodos } from '../utils/api';

interface Props {
    createWin: boolean;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCreateWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateWindow: React.FC<Props> = ({ setTodoList, createWin, setCreateWin }) => {
    const [createForm, setCreateForm] = useState<Todo>({
        text: '',
        complete: false,
        priority: false,
        duedate: todayDate(),
        tags: [],
        createdate: todayDate(),
        checkdate: '',
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
        setTodoList(updatedTodos);
    };

    const handleSave = (id: string) => {
        handleNewTodo();
        handleClose();
        setCreateForm(prev => ({
            ...prev,
            text: '',
            complete: false,
            priority: false,
            tags: [],
            checkdate: '',
            id: ''
        }));
    }

    return (
        <div style={{height: !createWin ? '0px' : '500px',display: !createWin ? 'none' : 'inline', opacity: !createWin ? '0' : '1'}} className="duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] bg-gray-300 rounded-xl shadow-xl outline outline-1 border-4 border-gray-300 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            <div className="flex flex-row w-full items-center justify-between text-gray-100 outline outline-5 outline-gray-900 bg-gray-900 rounded-t-lg">
                <h2 className="flex flex-col text-lg font-semibold items-center flex-grow py-2 px-4">
                    Create a new todo Item
                </h2>
                <button className="font-black text-xl p-2" onClick={handleClose}>
                    X
                </button>
            </div>

            <div style={{padding: !createWin ? '0' : '0.75rem', display: !createWin ? 'none' : 'inline'}} className="flex flex-col">
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
                            
                            <div className="invisible px-6 py-2 rounded-md bottom-4 bg-gray-300">
                                Save Changes
                            </div>

                            <button onClick={() => handleSave(createForm.id)} className="absolute px-6 py-2 rounded-md bottom-4 bg-gray-300 shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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