import { Todo } from "../types/todo";
import { formatDate } from "./date-functions";

const API_URL = 'https://6694c02a4bd61d8314c873e2.mockapi.io/todo-item';

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
  
    // Format the dates
    const formattedData = data.map((todo: Todo) => ({
      ...todo,
      duedate: formatDate(todo.duedate),
      createdate: formatDate(todo.createdate),
    }));
  
    // Sorting logic
    formattedData.sort((a: Todo, b: Todo) => {
      if (a.priority && !b.priority) {
        return -1;
      }
      return 0;
    });
  
    formattedData.sort((a: Todo, b: Todo) => {
      if (!a.complete && b.complete) {
        return -1;
      }
      return 0;
    });
  
    return formattedData;
};

export const fetchTodosV2 = async (list: string): Promise<Todo[]> => {
    const url = new URL(API_URL);
    url.searchParams.append('list', list);
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
  
    const data = await response.json();
  
    // Format the dates
    const formattedData = data.map((todo: Todo) => ({
      ...todo,
      duedate: formatDate(todo.duedate),
      createdate: formatDate(todo.createdate),
    }));
  
    // Additional sorting logic: Priority and Completeness
    formattedData.sort((a: Todo, b: Todo) => {
      if (a.priority && !b.priority) {
        return -1;
      }
      if (!a.complete && b.complete) {
        return -1;
      }
      return 0;
    });
  
    return formattedData;
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

export const updateTodo = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
};