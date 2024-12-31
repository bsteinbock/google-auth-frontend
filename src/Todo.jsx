import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem('authToken');

        const response = await fetch('http://localhost:5050/api/v1/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('There was an error fetching todos!', error);
      }
    };

    fetchTodos();
  }, []);

  // Toggle completed state todo
  const setCompleted = async (id, completed) => {
    const thisTodo = todos.find((t) => t.id !== id);
    if (!thisTodo) return;

    try {
      // Get the token from sessionStorage
      const token = sessionStorage.getItem('authToken');

      const response = await fetch(`http://localhost:5050/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ ...thisTodo, completed }),
      });

      if (response.ok) {
        const fetchResponse = await fetch(
          'http://localhost:5050/api/v1/todos',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchData = await fetchResponse.json();
        setTodos(fetchData);
      } else {
        console.error('Error adding todo');
      }
    } catch (error) {
      console.error('There was an error adding the todo!', error);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!todo) return;

    try {
      // Get the token from sessionStorage
      const token = sessionStorage.getItem('authToken');

      const response = await fetch('http://localhost:5050/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: todo }),
      });

      if (response.ok) {
        const response = await fetch('http://localhost:5050/api/v1/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Error adding todo');
      }
    } catch (error) {
      console.error('There was an error adding the todo!', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      // Get the token from sessionStorage
      const token = sessionStorage.getItem('authToken');

      const response = await fetch(`http://localhost:5050/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        console.error('Error deleting todo');
      }
    } catch (error) {
      console.error('There was an error deleting the todo!', error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>

      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => setCompleted(todo.id, e.target.checked)}
            />
            {todo.title}{' '}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
