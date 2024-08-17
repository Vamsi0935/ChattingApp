import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Chat from "./components/Chat/Chat";
import SetAvatar from "./pages/SetAvatar/SetAvatar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </Router>
  );
}

export default App;
