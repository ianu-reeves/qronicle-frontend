import './App.css';
import React from 'react';
import PrimaryAppBar from "./components/PrimaryAppBar";
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
