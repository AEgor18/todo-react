import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="d-flex align-items-center bg-light p-2 rounded shadow-sm mb-3 w-100">
      <input
        type="checkbox"
        className="form-check-input me-3"
        style={{ cursor: 'pointer' }}
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        className={`flex-grow-1 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
      >
        {todo.title}
      </span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteTodo(todo.id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default TodoItem;
