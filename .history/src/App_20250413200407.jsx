import "./CSS/App.css";
import Deck from "./components/Deck.jsx";
import { TaskCardProvider } from "./context/TaskCardContext.jsx";

function App() {
  return (
    <>
      <TaskCardProvider>
        <Deck />
      </TaskCardProvider>
    </>
  );
}

export default App;
