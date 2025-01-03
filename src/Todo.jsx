import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext.jsx';

const Todo = () => {
  const { authToken } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/v1/todos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
      const response = await fetch(`http://localhost:5050/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },

        body: JSON.stringify({ ...thisTodo, completed }),
      });

      if (response.ok) {
        const fetchResponse = await fetch(
          'http://localhost:5050/api/v1/todos',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
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
      const response = await fetch('http://localhost:5050/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title: todo }),
      });

      if (response.ok) {
        const response = await fetch('http://localhost:5050/api/v1/todos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
      const response = await fetch(`http://localhost:5050/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
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
    <>
      <div className="todo-list-header">
        <h2>ToDo List</h2>
        <div className="todo-header-image">
          <svg height="24px" width="24px" fill="#5f6368">
            <use href="#todo-list" />
          </svg>
        </div>
      </div>

      <div class="todo-add-container">
        <input
          className="todo-input"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button className="todo-add-button" onClick={addTodo}>
          <svg className="todo-add-svg">
            <use href="#add" />
          </svg>
        </button>
      </div>
      <div className="todo-list-container">
        <ul className="list-items">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                className="todo-completed"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => setCompleted(todo.id, e.target.checked)}
              />
              <div className="todo-title">
                <input
                  type="text"
                  id="1"
                  className="todo-edit-input"
                  value={todo.title}
                />
              </div>
              <div class="todo-edit-button-container">
                <button
                  className="todo-edit-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <svg height="24px" width="24px" fill="#000">
                    <use href="#delete" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
