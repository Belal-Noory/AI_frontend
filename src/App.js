import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<Chatpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
