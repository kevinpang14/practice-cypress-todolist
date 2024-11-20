import { legacy_createStore as createStore, applyMiddleware } from "redux";

// state untuk menampung data
const initialState = {
  count: 0,
};

// action untuk penghubung antara state dan reducer
/*
{
    type: 'INCREMENT',
    payload: 4
}
*/

// slice untuk memisahkan reducer

// reducer untuk mengelola state
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.payload,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};

//middleware untuk menangkap action

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action", action);
  next(action);
  console.log("state terbaru", store.getState());
};

// store untuk menyimpan semua state (data)
const store = createStore(counterReducer, applyMiddleware(loggerMiddleware));

// state awal
console.log("state awal", store.getState());

// subscribe untuk menangkap perubahan state (useEffect)
store.subscribe(() => {
  // menampilkan perubahan state
  console.log("state terbaru", store.getState());
});

// dispatch untuk mengirimkan action ke reducer
store.dispatch({
  type: "INCREMENT",
  payload: 4,
});

store.dispatch({
  type: "DECREMENT",
  payload: 2,
});
