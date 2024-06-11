import './App.css';
import React from 'react';
import PrimaryAppBar from "./components/PrimaryAppBar";
import Router from "./components/Router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <PrimaryAppBar />
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
