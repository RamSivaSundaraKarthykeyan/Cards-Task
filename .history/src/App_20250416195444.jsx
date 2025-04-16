import React from "react";
import "./CSS/App.css";
import Deck from "./components/Deck.jsx";
import { TaskCardProvider } from "./context/TaskCardContext.jsx";
import Timer from "./components/Timer.jsx";
import StickyNotes from "./components/StickyNotes.jsx";

function App() {
  return (
    <>
      <div className="app-container"></div>
      <div className="sidebar">
        <Timer />
      </div>
      <div className="main-content">
        <TaskCardProvider>
          <Deck />
        </TaskCardProvider>
      </div>
      <div className="sticky-note">
        <StickyNotes />
      </div>
    </>
  );
}

export default App;
