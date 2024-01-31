import React, { useEffect, useReducer, useState } from "react";
import reducer from "./reducer/todoReducer";
import { Avatar, Button, Checkbox, Container, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style/todo.css";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = [];

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    isLoading,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    const loadTodoList = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        if (isAuthenticated && idTokenClaims) {
          const userId = idTokenClaims.sub;
          const storedTodoList = localStorage.getItem(`todoList_${userId}`);
          if (storedTodoList) {
            dispatch({
              type: "SET_TODO_LIST",
              payload: JSON.parse(storedTodoList),
            });
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    loadTodoList();
  }, [isAuthenticated, getIdTokenClaims]);

  const saveTodoList = (todoList) => {
    const userId = user.sub; // User ID from Auth0
    localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
  };

  const inputItem = (e) => {
    setInput(e.target.value);
  };
  const AddItem = () => {
    dispatch({ type: "ADD_ITEM", payload: input });
    setInput("");
  };
  const deleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };
  const markAsDone = (id) => {
    dispatch({ type: "MARK_AS_DONE", payload: id });
  };
  const handleLogout = () => {
    saveTodoList(state);
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  return (
    <Container maxWidth="sm">
      <div className="center-card">
        <div>
          <div className="header-container">
            <div className="textCenter">
              <h1>
                <img
                  src="https://r2.easyimg.io/9x1xs23ox/to-do-list.png"
                  alt="logo"
                  width="25rem"
                />{" "}
                Todo List
              </h1>
            </div>
            <div className="loginBtn">
              {isAuthenticated ? (
                <Button variant="contained" onClick={handleLogout}>
                  Log Out
                </Button>
              ) : (
                <Button variant="contained" onClick={() => loginWithRedirect()}>
                  Login
                </Button>
              )}
            </div>
          </div>
          <div className="avatar">
            {isAuthenticated ? (
              <>
                <Avatar alt={user.name} src={user.picture} /> Hi {user.name},
                your todolist are listed below
              </>
            ) : (
              <>
                <Avatar alt="abc" src="abc" /> Please Log in if you want to save
                your data.
              </>
            )}
          </div>
          <TextField
            variant="standard"
            placeholder="Type here"
            onChange={inputItem}
            value={input}
          />
          <Button variant="contained" onClick={AddItem}>
            <AddIcon />
          </Button>
          {isLoading ? (
            <p>Loading.......</p>
          ) : (
            <ol>
              {state.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="inputType"
                    style={{ textDecoration: item.done ? "line-through" : "" }}
                  >
                    {item.name}
                    <Checkbox onClick={() => markAsDone(item.id)} />
                    <div className="deleteBtn">
                      <DeleteIcon onClick={() => deleteItem(item.id)} />
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Todo;
