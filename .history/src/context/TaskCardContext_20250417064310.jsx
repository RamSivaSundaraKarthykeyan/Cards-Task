import React, { createContext, useEffect, useContext, useState } from "react";

const TaskCardContext = createContext();

export function TaskCardProvider({ children }) {
  const [taskCards, setTaskCards] = useState(() => {
    const stored = localStorage.getItem("taskCards");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const addTaskCard = (taskCard) => setTaskCards((prev) => [...prev, taskCard]);
  const removeTaskCard = (id) =>
    setTaskCards((prev) => prev.filter((tc) => tc.id !== id));

  const pickRandomTaskCard = () => {
    if (taskCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * taskCards.length);
    const randomCard = taskCards[randomIndex];
    setSelectedTaskId(randomCard.id);
    return randomCard;
  };

  return (
    // any component that consumes this context will have access to these value objects
    <TaskCardContext.Provider
      value={{
        taskCards,
        addTaskCard,
        removeTaskCard,
        pickRandomTaskCard,
        selectedTaskId,
      }}
    >
      {children}
    </TaskCardContext.Provider>
  );
}

export function useTaskCardContext() {
  return useContext(TaskCardContext);
}
