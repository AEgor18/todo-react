import React from 'react';
import TodoItem from '../todoItem/TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="mt-4 w-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
