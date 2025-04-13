import React, { useRef, useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import { useTaskCardContext } from "../context/TaskCardContext.jsx";
import "../CSS/Deck.css";

function Deck() {
  const { taskCards, addTaskCard, removeTaskCard, pickRandomTaskCard } =
    useTaskCardContext();

  const inputRef = useRef({});

  const handleAddTaskCard = () => {
    const newId =
      taskCards.length === 0 ? 1 : taskCards[taskCards.length - 1].id + 1;
    addTaskCard({ id: newId });
    inputRef.current[newId] = React.createRef();
  };

  const handlePickRandomTaskCard = () => {
    const randomTaskCard = pickRandomTaskCard();
    if (randomTaskCard) {
      alert(`random Task Card:\nIDl: ${randomTaskCard.id}`);
    } else {
      alert(`No Task Cards Available!`);
    }
  };

  useEffect(() => {
    if (taskCards.length > 0) {
      const lastTaskCard = taskCards[taskCards.length - 1];
      inputRef.current[lastTaskCard.id]?.current?.focus();
    }
  }, [taskCards]);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
      className="deck"
    >
      <button onClick={handlePickRandomTaskCard}> Pick a Random Task </button>
      <button className="task-card-add-button" onClick={handleAddTaskCard}>
        +
      </button>
      {taskCards.map((tc) => (
        <TaskCard
          id={tc.id}
          key={tc.id}
          removeTask={() => removeTaskCard(tc.id)}
          inputRef={inputRef.current[tc.id]}
        />
      ))}
    </div>
  );
}

export default Deck;
