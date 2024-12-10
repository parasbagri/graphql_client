import React, { useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to fetch todos
const GET_ALL_USERS = gql`
  query GetAllTodos {
    getTodos {
      title
      id
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State for login
  const [username, setUsername] = useState('');         // For capturing username input
  const [password, setPassword] = useState('');         // For capturing password input
  const [doneTodos, setDoneTodos] = useState([]);       // State to track done todos
  const [newTodo, setNewTodo] = useState('');           // State for new todo input
  const [todos, setTodos] = useState([]);               // State to store todos
  
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);  // Set user as logged in
    } else {
      alert("Please fill in both username and password!");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Function to mark a todo as done
  const markAsDone = (id) => {
    setDoneTodos([...doneTodos, id]);  // Add the todo id to doneTodos array
  };

  // Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim() === '') {
      alert('Please enter a valid todo!');
      return;
    }

    // Create the new todo object
    const newTodoObj = {
      id: Date.now(), // Generate a unique ID using timestamp (for simplicity)
      title: newTodo
    };

    // Update todos state with the new todo
    setTodos([...todos, newTodoObj]);  // Add new todo to the state

    // Clear the input field after adding
    setNewTodo('');
  };

  // If user is not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form className='form' onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // If logged in, show todo list and additional buttons
  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Display loading or error states */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Todo List */}
      <ul className="todo-list">
        {todos && todos.map((todo) => (
          // Only render the todo item if it's not marked as done
          !doneTodos.includes(todo.id) && (
            <li key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              {/* Mark as Done button */}
              <button className="todo-action" onClick={() => markAsDone(todo.id)}>Mark as Done</button>
            </li>
          )
        ))}
      </ul>

      {/* Add Todo Input and Button */}
      <div className="add-todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}  // Update newTodo state on input change
          placeholder="Enter new todo"
        />
        <button className="add-todo-button" onClick={addTodo}>Add Todo</button>
      </div>

      {/* Buttons for future actions */}
      <div className="actions">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
