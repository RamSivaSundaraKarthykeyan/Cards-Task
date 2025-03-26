import { useState } from "react";
import TaskCard from "./TaskCard.jsx";

function Deck() {
  const [taskCards, setTaskCard] = useState([]);

  const addTaskCard = () => {
    const newId =
      taskCards.length === 0 ? 1 : taskCards[taskCards.length - 1].id + 1;
    setTaskCard([...taskCards, { id: newId }]);
  };

  console.log(taskCards);

  return (
    <div>
      <button onClick={addTaskCard}>+</button>
      {taskCards.map((tc) => (
        <TaskCard id={tc.id} key={tc.id} />
      ))}
    </div>
  );
}

export default Deck;
