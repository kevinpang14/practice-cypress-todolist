import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { toggleLang } from "./redux/languages/langAction";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // get lang and toggle lang
  const lang = useSelector((state) => state.languageRed.lang);

  const handleToggleLang = () => {
    const updatelang = lang === "en" ? "id" : "en";
    dispatch(toggleLang(updatelang));
  };
  //---------

  return (
    <div className="container mt-5">
      {/* toggle language */}
      <button
        className="btn btn-secondary mb-4"
        onClick={handleToggleLang}
        cy-data="toggle-lang"
      >
        {lang === "en" ? "EN/ID" : "ID/EN"}
      </button>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1
                className="card-title text-center mb-4"
                cy-data="todo-list-title"
              >
                {/* changed language */}
                {lang === "en" ? "To-Do List" : "Daftar Tugas"}
              </h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
