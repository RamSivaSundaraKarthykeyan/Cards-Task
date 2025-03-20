import CheckBox from "./CheckBox";
import { useState } from "react";

function TaskCard() {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const addCheckBox = () => {
    const newID =
      checkBoxes.length === 0 ? 1 : checkBoxes[checkBoxes.length - 1].id + 1;
    setCheckBoxes([...checkBoxes, { id: newID }]);
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
        <h1>Task</h1>
        {checkBoxes.map((checkBox) => (
          <CheckBox
            key={checkBox.id}
            id={checkBox.id}
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
