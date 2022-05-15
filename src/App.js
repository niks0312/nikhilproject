import React, { useState } from "react";
import Kanban from "./kanban/Kanban";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";

function App() {
  const [user, setUser] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kanban />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
