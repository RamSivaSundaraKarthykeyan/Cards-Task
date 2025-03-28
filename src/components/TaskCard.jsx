import { useState, useEffect, useRef } from "react";
import CheckBox from "./CheckBox.jsx";
import "../CSS/TaskCard.css";

function TaskCard({ id, removeTask, inputRef }) {
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [text, setText] = useState([""]); // the text state is an array that holds the text each checkBox
  const [headerText, setHeaderText] = useState("");

  const checkBoxRefs = useRef({});

  const addCheckBox = () => {
    const newId =
      checkBoxes.length === 0 ? 1 : checkBoxes[checkBoxes.length - 1].id + 1;
    setCheckBoxes([...checkBoxes, { id: newId }]);
    setText([...text, ""]); // the spread operator ... copies the current "text" array and appends a new empty string""
  };

  const deleteCheckBox = (id) => {
    const updatedCheckBox = checkBoxes.filter((cb) => cb.id !== id);
    setCheckBoxes(updatedCheckBox);

    // It is a comman convention in JS to indicate that the parameter is unused,
    //  we use it here because we dont actually need the value of the element so it is used as a placeholder
    // "_" represents the current element of the array during iteration, "index" it is the index of the element in the array
    const updatedText = text.filter((_, index) => index !== id - 1);
    setText(updatedText);
  };

  const updatedText = (id, value) => {
    setText((prevText) => {
      const updated = [...prevText];
      updated[id - 1] = value;
      return updated;
    });
  };

  return (
    <div className="task-card">
      <label>
        <input
          type="text"
          placeholder="Task Card Name"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          className="card-title"
          style={{ borderBottom: "2px solid #rgb(0, 0, 0)" }}
          ref={inputRef}
        />
        <button className="remove-button" onClick={removeTask}>
          -
        </button>
      </label>

      <div className="checkbox-container">
        {checkBoxes.map((cb) => (
          <CheckBox
            id={cb.id}
            key={cb.id}
            removeCheckBox={() => deleteCheckBox(cb.id)}
            updatedText={(value) => updatedText(cb.id, value)}
          />
        ))}
      </div>

      <button className="add-check-box-button" onClick={addCheckBox}>
        +
      </button>
    </div>
  );
}

export default TaskCard;
