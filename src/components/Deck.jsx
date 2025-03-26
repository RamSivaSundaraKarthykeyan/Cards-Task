import { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import "../CSS/Deck.css";

function Deck() {
  const [taskCards, setTaskCard] = useState([]);

  const addTaskCard = () => {
    const newId =
      taskCards.length === 0 ? 1 : taskCards[taskCards.length - 1].id + 1;
    setTaskCard([...taskCards, { id: newId }]);
  };

  const deleteTask = (id) => {
    const updatedTaskCard = taskCards.filter((tc) => tc.id !== id);
    setTaskCard(updatedTaskCard);
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
      className="deck"
    >
      <button className="task-card-add-button" onClick={addTaskCard}>
        +
      </button>
      {taskCards.map((tc) => (
        <TaskCard id={tc.id} key={tc.id} removeTask={() => deleteTask(tc.id)} />
      ))}
    </div>
  );
}

export default Deck;
