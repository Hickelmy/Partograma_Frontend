import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AddCellForm from "./Page/addcel";
import MaterialTable from "./Page/Table";
import AgramaEditor from "./Page/Charts";
import { Container, Stack } from "@mui/material";

function App() {
  return (
    <div className="App">
      <AgramaEditor />
    </div>
  );
}

export default App;
