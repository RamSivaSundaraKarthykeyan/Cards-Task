import React, { createContext, useContext, useState } from "react";

const TaskCardContext = createContext();

export function TaskCardProvider({ children }) {
  const [taskCards, setTaskCards] = useState([]);

  const addTaskCard = (taskCard) => setTaskCards((prev) => [...prev, taskCard]);
  const removeTaskCard = (id) =>
    setTaskCards((prev) => prev.filter((tc) => tc.id !== id));

  const pickRandomTaskCards = () => {
    if (taskCards.length === 0) return null;
    const randomindex = Math.floor(Math.random() * taskCards.length);
    return taskCards[randomIndex];
  };
}
