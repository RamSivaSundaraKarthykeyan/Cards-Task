function CheckBox({ id, removeCheckBox, text }) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        {text || `Check Box ${id}`}
        <button onClick={removeCheckBox}>-</button>
      </label>
    </div>
  );
}

export default CheckBox;
