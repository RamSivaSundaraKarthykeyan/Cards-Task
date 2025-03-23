import { useState } from "react";
import CheckBox from "./CheckBox.jsx";

function TaskCard() {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const addCheckBox = () => {
    const newId =
      checkBoxes.length === 0 ? 1 : checkBoxes[checkBoxes.length - 1].id + 1;
    setCheckBoxes([...checkBoxes, { id: newId }]);
  };

  const deleteCheckBox = (id) => {
    const updatedCheckBox = checkBoxes.filter((cb) => cb.id !== id);
    setCheckBoxes(updatedCheckBox);
  };

  return (
    <>
      <h1>Task</h1>
      {checkBoxes.map((cb) => (
        <CheckBox
          id={cb.id}
          key={cb.id}
          removeCheckBox={() => deleteCheckBox(cb.id)}
        />
      ))}
      <button onClick={addCheckBox}>+</button>
    </>
  );
}

export default TaskCard;
