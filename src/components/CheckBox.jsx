function CheckBox({ id, removeCheckBox }) {
  return (
    <>
      <label>
        <input type="checkbox" />
        {id}. Check Box
        <button onClick={removeCheckBox}>-</button>
      </label>
    </>
  );
}

export default CheckBox;
