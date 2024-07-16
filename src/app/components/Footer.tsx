import AddButton from './AddButton';
import { createTodo, fetchTodos, deleteTodo, updateTodo } from '../utils/api';

export default function Footer() {
    return (
        <div className='absolute bottom-0 left-0 p-2 flex w-full items-center justify-center shadow-[0_10px_15px_3px_rgba(0,0,0,0.1),0_4px_6px_4px_rgba(0,0,0,0.1)]  bg-white drop-shadow-[0_-1.5px_1.5px_rgba(0,0,0,0.3)]'>
            <AddButton size={'3.75rem'} />
        </div>
    )
}
