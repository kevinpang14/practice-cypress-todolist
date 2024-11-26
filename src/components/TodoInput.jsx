// src/components/TodoInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/async/todos/todoAction";
import { v4 as uuidv4 } from "uuid"; //random id generator

const TodoInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const updatingTrackID = useSelector((state) => state.todoRed.updateTrackId);
  //todos array
  const todos = useSelector((state) => state.todoRed.todos);

  useEffect(() => {
    // Check if updatingTrackID exists and update the input field
    if (updatingTrackID) {
      const taskToUpdate = todos.find((todo) => todo.id === updatingTrackID);
      if (taskToUpdate) {
        setText(taskToUpdate.text);
      }
    } else {
      // Clear the input field when updatingTrackID is cleared
      setText("");
    }
  }, [updatingTrackID, todos]);

  //toggle handle submit between add and update
  const handleSubmit = (e) => {
    e.preventDefault();
    //update the task by id
    if (updatingTrackID) {
      console.log("update tracking id:", updatingTrackID);
      console.log("update text to:", text);
      dispatch(updateTodo(updatingTrackID, { text }));

      // Clear the input field and reset the updatingTrackID
      dispatch({ type: "TOGGLE_UPDATE", payload: null });
    } else {
      dispatch(addTodo({ id: uuidv4(), text, completed: false }));
    }
    setText("");
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          cy-data="input-form"
        />
        <button
          className="btn btn-primary"
          type="submit"
          cy-data="input-button"
        >
          {updatingTrackID ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
