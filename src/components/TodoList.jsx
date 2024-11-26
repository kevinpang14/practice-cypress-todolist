import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  toggleTodo,
  toggleUpdate,
} from "../redux/async/todos/todoAction";

const TodoList = () => {
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todoRed
  );
  const dispatch = useDispatch();

  //get data first time, on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  //if success then get data again
  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (todos.length === 0) {
    return <div>No todos found.</div>;
  }

  return (
    <ul className="list-group" cy-data="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <span>
            <button
              className="btn btn-danger btn-sm mx-1"
              onClick={() => dispatch(deleteTodo(todo.id))}
              cy-data="delete-button"
            >
              Delete
            </button>
            <button
              className="btn btn-info btn-sm mx-1"
              onClick={() => dispatch(toggleTodo(todo.id, todo.completed))}
              cy-data="toggle-button"
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              className="btn btn-warning btn-sm mx-1"
              //set the update track id to todo.id
              onClick={() => dispatch(toggleUpdate(todo.id))}
              cy-data="update-button"
            >
              Update
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
