import React, { useState } from 'react';
import TodoList from './components/todoList/todoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); 

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <div
      className="container py-4 d-flex flex-column align-items-center"
      style={{
        maxWidth: '500px',
        marginTop: '50px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        backgroundColor: '#fff', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 className="text-center text-primary mb-4">My To-Do List</h1>
      <form className="row g-2 justify-content-center w-100" onSubmit={addTodo}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task..."
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      <div className="mt-3 d-flex w-100 ">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm me-3 `}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'} btn-sm me-3`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`btn ${filter === 'incomplete' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </button>
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
