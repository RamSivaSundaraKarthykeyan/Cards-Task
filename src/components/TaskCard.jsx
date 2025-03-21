import CheckBox from "./CheckBox";
import { useState } from "react";

function TaskCard() {
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [TaskCard, setTask] = useState("");

  const addCheckBox = () => {
    const newID =
      checkBoxes.length === 0 ? 1 : checkBoxes[checkBoxes.length - 1].id + 1;
    setCheckBoxes([...checkBoxes, { id: newID }]);
    setTask("");
  };

  const deleteCheckBox = (id) => {
    const updatedCheckBoxes = checkBoxes.filter(
      (checkBox) => checkBox.id !== id
    );
    setCheckBoxes(updatedCheckBoxes);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter Task"
          value="Task"
          onChange={(e) => setTask(e.target.value)}
        />

        <h1>Task</h1>
        {checkBoxes.map((checkBox) => (
          <CheckBox
            key={checkBox.id}
            id={checkBox.id}
            text={checkBox.text}
            removeCheckBox={() => deleteCheckBox(checkBox.id)}
          />
        ))}
      </div>

      <div>
        <button onClick={addCheckBox}>+</button>
      </div>
    </>
  );
}

export default TaskCard;
