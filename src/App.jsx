import React from "react";
import SignIn from "./login";
import SignUp from "./register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserTitle from "./UserTitle";

export default function App() {
  return (
    // <Classification />
    <Router>
      <Routes>
        <Route exact path="/register" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/userTitle" element={<UserTitle />} />
      </Routes>
    </Router>
  );
}
