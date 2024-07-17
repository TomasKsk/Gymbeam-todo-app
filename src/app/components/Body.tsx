import TodoItem from "./TodoItem";
import { SelectSwitch, Todo } from "../types/todo";
import { useEffect, useState } from "react";
import EditWindow from "./EditWindow";
import Link from "next/link";

interface Props {
    selectSwitch: SelectSwitch;
    setSelectSwitch: React.Dispatch<React.SetStateAction<SelectSwitch>>;
    todoList: Todo[];
    list: string[];
    setList: React.Dispatch<React.SetStateAction<string[]>>
    page: string;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Body: React.FC<Props> = ({ selectSwitch, setSelectSwitch, list, setList, page, todoList, setTodoList }) => {
    console.log('rendered body element')
    const [listbackup, setListBackup] = useState<string[]>([])
    const [editingTodo, setEditingTodo] = useState({
        win: false,
        id: ''
    });

    const listLength = todoList.length;
    const currentTodo = todoList.find(a => a.id === editingTodo.id);

    const handleItem = (obj: Todo) => {
        if (selectSwitch.multi) {
            const objId = obj.id;
            let selectArray = selectSwitch.multiSelectItems;
            console.log(selectArray, selectArray.includes(objId))

            if (selectArray.includes(objId)) {
                selectArray = selectArray.filter(a => a !== objId)
            } else {
                selectArray.push(objId)
            }

            setSelectSwitch(prev => ({
                ...prev,
                multiSelectItems: selectArray
            }))
        }
    }

    useEffect(() => {
        if (list.length > 0) {
            if (!listbackup.map(a => list.includes(a))) {
                console.log('unchanged')
                setListBackup(list)
            } else {
                setListBackup(list)
            }
        }
    },[list])

    return (
        <div className="w-full flex flex-row md:justify-between">
            <div className="max-[768px]:hidden w-[300px] flex flex-col bg-white text-2xl pt-10">
                <ul className="flex flex-col gap-4">
                    {
                        listbackup.map((obj,idx) => {
                            return(
                                <li style={{backgroundColor: page === obj ? 'rgb(209 213 219)' : ''}} className="pl-4 py-2 rounded-l-md ml-8" key={`todo-list-pc-link-${idx}`}>
                                    <Link href={obj}>
                                        {obj}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            

            <div className="w-full flex flex-col md:max-w-[1400px] md:flex-row md:h-[90vh] md:pb-[20px] h-[82vh] pb-[84px] overflow-y-scroll gap-4 p-4">
                <div className="flex flex-row w-full h-fit items-center justify-center flex-wrap gap-4">
                    {
                        todoList.map((obj, idx) => (
                            <span className="flex flex-col w-full flex-wrap md:max-w-[48%] lg:max-w-[32%]" key={`todo-item-${idx}`} onClick={() => handleItem(obj)}>
                                <TodoItem
                                    selectSwitch={selectSwitch}
                                    key={obj.id}
                                    listLength={listLength}
                                    page={page}
                                    todo={obj} 
                                    setTodoList={setTodoList} 
                                    setEditingTodo={setEditingTodo} 
                                />
                            </span>
                        ))
                    }
                </div>

                {editingTodo.win && currentTodo && (
                    <EditWindow 
                        list={list}
                        setList={setList}
                        page={page}
                        todo={currentTodo} 
                        setTodoList={setTodoList} 
                        editingTodo={editingTodo} 
                        setEditingTodo={setEditingTodo} 
                    />
                )}
            </div>
        </div>
    );
}

export default Body;