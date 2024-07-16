import TodoItem from "./TodoItem";
import { Todo } from "../types/todo"
import { useState } from "react";
import EditWindow from "./EditWindow";

interface Props {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Body: React.FC<Props> = ({ todoList, setTodoList }) => {
    const [editingTodo, setEditingTodo] = useState({
        win: false,
        id: ''
    });

    return (
        <div className="flex flex-col gap-4 p-4 mb-[84px] mt-[84px]">
            {
                todoList.map(obj => {
                    return (
                        <TodoItem key={obj.id} todo={obj} setTodoList={setTodoList} setEditingTodo={setEditingTodo} />
                    )
                })
            }

            {
                editingTodo.win &&
                    <EditWindow todo={todoList.find(a => a.id === editingTodo.id)} setTodoList={setTodoList} editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
            }

        </div>
    )
}

export default Body