import React, { useReducer, useState } from "react";
import reducer from "./reducer/todoReducer";
import { Button, Card, Container, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const initialState = [];

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const inputItem = (e) => {
    setInput(e.target.value);
  };
  const AddItem = () => {
    dispatch({ type: "ADD_ITEM", payload: input });
    setInput(" ");
  };
  const deleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };
  const markAsDone = (id) => {
    dispatch({ type: "MARK_AS_DONE", payload: id });
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <div className="center-card">
          <h1>Todo List</h1>
          <TextField
            variant="standard"
            placeholder="Type here"
            onChange={inputItem}
            value={input}
          />
          <Button variant="contained" onClick={AddItem}>
            <AddIcon />
          </Button>
          <ol>
            {state.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{ textDecoration: item.done ? "line-through" : "" }}
                >
                  {item.name}{" "}
                  <Button
                    variant="contained"
                    onClick={() => markAsDone(item.id)}
                  >
                    {item.done ? "Undone" : "Done"}
                  </Button>
                  <Button variant="contained">
                    <DeleteIcon onClick={() => deleteItem(item.id)} />
                  </Button>
                </li>
              );
            })}
          </ol>
        </div>
      </Card>
    </Container>
  );
};

export default Todo;
