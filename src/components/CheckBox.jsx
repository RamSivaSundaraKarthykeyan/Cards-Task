function CheckBox({ id, removeCheckBox }) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        Check Box {id}
        <button onClick={removeCheckBox}>-</button>
      </label>
    </div>
  );
}

export default CheckBox;
