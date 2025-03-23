import "../CSS/checkBox.css";

function CheckBox({ id, removeCheckBox }) {
  return (
    <>
      <label>
        <div>
          <input type="checkbox" />
          {id}.
          <input type="text" className="textField" />
          <button onClick={removeCheckBox}>-</button>
        </div>
      </label>
    </>
  );
}

export default CheckBox;
