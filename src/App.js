import React, {useState} from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./Firebase";

import Home from "./components/Home";

import Nav from "./components/Nav";
import Login from "./components/Login";

function App() {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      {user ? (
        <div>
          <Nav show={show} setShow={setShow} />
          <Home show={show} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
