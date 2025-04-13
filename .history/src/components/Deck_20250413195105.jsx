import React, { useState, useRef, useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import { useTaskCardContext } from "../context/TaskCardContext.jsx";
import "../CSS/Deck.css";

function Deck() {
  const { taskCards, addTaskCards, removeTaskCard, pickRandomTaskCard } =
    useTaskCardContext();

  const inputRef = useRef({});

  const addTaskCard = () => {
    const newId =
      taskCards.length === 0 ? 1 : taskCards[taskCards.length - 1].id + 1;
    addTaskCard({ id: newId });
    inputRef.current[newId] = React.createRef();
  };

  const deleteTask = (id) => {
    const updatedTaskCard = taskCards.filter((tc) => tc.id !== id);
    setTaskCard(updatedTaskCard);

    delete inputRef.current[id];
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
      <button className="task-card-add-button" onClick={addTaskCard}>
        +
      </button>
      {taskCards.map((tc) => (
        <TaskCard
          id={tc.id}
          key={tc.id}
          removeTask={() => deleteTask(tc.id)}
          inputRef={inputRef.current[tc.id]}
        />
      ))}
    </div>
  );
}

export default Deck;
