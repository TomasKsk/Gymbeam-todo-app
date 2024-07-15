import TodoItem from "./TodoItem";
import { Todo } from "../types/todo"

interface Props {
    todoList: Todo
}

const Body: React.FC<Props> = ({ todoList }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {
                todoList.map(obj => {
                    return (
                        <TodoItem key={obj.id} todo={obj} />
                    )
                })
            }
        </div>
    )
}

export default Body