import { useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_ALL_USERS = gql`
  query GetAllTodos {
    getTodos {
      title
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul className="todo-list">
        {data.getTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
