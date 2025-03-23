function CheckBox({ id, removeCheckBox }) {
  return (
    <>
      <label>
        <div>
          <input type="checkbox" />
          {id}.
          <input type="text" />
          <button onClick={removeCheckBox}>-</button>
        </div>
      </label>
    </>
  );
}

export default CheckBox;
