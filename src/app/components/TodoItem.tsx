import { Todo } from "../types/todo"

interface Props {
    todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {

    return (
        <div className="flex flex-col w-full p-2 rounded-md shadow-xl bg-gray-100">
            <div className="flex flex-row justify-between text-sm">
                <p>
                    Due: {todo.duedate}
                </p>
                <div className="size-[10px] border-l-[10px] border-l-transparent border-b-[20px] border-b-yellow-500 border-r-[10px] border-r-transparent flex flex-col items-center font-bold">
                    !
                </div>
                <p className="text-gray-400">
                    Created: {todo.createdate}
                </p>
            </div>
            <div className="flex flex-row justify-between p-2">
                <div className="m-auto">
                    <input className="size-[20px]" 
                    type="checkbox" 
                    checked={todo.complete}
                    />

                </div>
                <div className="flex flex-grow items-center justify-center p-2">
                    <h1 className="text-lg font-bold">{todo.text}</h1>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div>
                        edit
                    </div>
                    <div>
                        del
                    </div>
                </div>

            </div>

            <div className="w-full flex flex-col items-start text-sm text-gray-500">
                {todo.tags.map(a => `#${a}`).join(', ')}
            </div>
        </div>
    )
}

export default TodoItem