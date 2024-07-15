import { Todo } from "../types/todo";

const API_URL = 'https://6694c02a4bd61d8314c873e2.mockapi.io/todo-item';

export const fetchTodos = async(): Promise<Todo[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data;
};

export const createTodo = async(todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        throw new Error('Failed to create todo');
    };

    return response.json();
};

export const deleteTodo = async(id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    };
}