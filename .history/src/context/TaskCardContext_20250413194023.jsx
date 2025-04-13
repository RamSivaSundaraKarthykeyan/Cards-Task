import React, { createContext, useContext, useState } from "react";

const TaskCardContext = createContext();

export function TaskCardProvider({ children }) {
  const [taskCards, setTaskCards] = useState([]);

  const addTaskCard = (taskCard) => setTaskCards((prev) => [...prev, taskCard]);
  const removeTaskCard = (id) =>
    setTaskCards((prev) => prev.filter((tc) => tc.id !== id));

  const pickRandomTaskCard = () => {
    if (taskCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * taskCards.length);
    return taskCards[randomIndex];
  };

  return (
    <TaskCarfContext.Provider
      value={{ taskCards, addTaskCard, removeTaskCard, pickRandomTaskCard }}
    >
      {children}
    </TaskCarfContext.Provider>
  );
}
