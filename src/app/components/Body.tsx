import TodoItem from "./TodoItem";
import { SelectSwitch, Todo } from "../types/todo";
import { useState } from "react";
import EditWindow from "./EditWindow";

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
    const [editingTodo, setEditingTodo] = useState({
        win: false,
        id: ''
    });

    const listLength = todoList.length;
    const currentTodo = todoList.find(a => a.id === editingTodo.id);

    const handleItem = (obj: Todo) => {
        console.log(obj)
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

    return (
        <div className="flex flex-col h-[82vh] pb-[84px] overflow-y-scroll gap-4 p-4">
            {
                todoList.map((obj, idx) => (
                    <span key={`todo-item-${idx}`} onClick={() => handleItem(obj)}>
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
    );
}

export default Body;