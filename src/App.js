import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./Firebase";

import Nav from "./components/Nav";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? (
        <div>
          <Nav />
          <Chat />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
