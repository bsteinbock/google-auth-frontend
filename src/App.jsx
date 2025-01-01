// src/App.js

import React from 'react';
import './App.css';
import Login from './login.jsx';
import Todo from './Todo.jsx';
import { UserProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}

export default App;
