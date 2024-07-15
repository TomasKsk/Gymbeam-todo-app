import TodoItem from "./TodoItem";
import { Todo } from "../types/todo"

interface Props {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Body: React.FC<Props> = ({ todoList, setTodoList }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {
                todoList.map(obj => {
                    return (
                        <TodoItem key={obj.id} todo={obj} setTodoList={setTodoList} />
                    )
                })
            }
        </div>
    )
}

export default Body