import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import { useState } from "react";
import EditWindow from "./EditWindow";

interface Props {
    todoList: Todo[];
    list: string[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Body: React.FC<Props> = ({ list, todoList, setTodoList }) => {
    const [editingTodo, setEditingTodo] = useState({
        win: false,
        id: ''
    });

    const currentTodo = todoList.find(a => a.id === editingTodo.id);

    return (
        <div className="flex flex-col h-[82vh] pb-[84px] overflow-y-scroll gap-4 p-4">
            {
                todoList.map(obj => (
                    <TodoItem key={obj.id} todo={obj} setTodoList={setTodoList} setEditingTodo={setEditingTodo} />
                ))
            }

            {editingTodo.win && currentTodo && (
                <EditWindow 
                    list={list}
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