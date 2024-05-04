import './App.css';
import React from 'react';
import PrimaryAppBar from "./components/AppBar";
import Router from "./components/Router";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <PrimaryAppBar />
      <Router />
    </div>
  );
}

export default App;
