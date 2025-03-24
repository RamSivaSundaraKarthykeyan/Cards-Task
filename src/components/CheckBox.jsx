import "../CSS/checkBox.css";

function CheckBox({ id, removeCheckBox, updatedText }) {
  return (
    <>
      <label>
        <div>
          <input type="checkbox" />
          {id}.
          <input
            type="text"
            className="textField"
            onChange={(e) => updatedText(e.target.value)}
          />
          <button onClick={removeCheckBox}>-</button>
        </div>
      </label>
    </>
  );
}

export default CheckBox;

// e is the event object which provides the informaution about the event, such as the type of event, the element that triggered the event and its current value
// e.target refers to the element that triggered the event. In this case it is <input> element
//e.target.value accesses the current value of the target
// No changes at all
