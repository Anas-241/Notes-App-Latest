function ColorPicker({ color, setColor }) {

  const colors = [
    "#fff9c4",
    "#ffccbc",
    "#c8e6c9",
    "#bbdefb",
    "#e1bee7",
  ];

  return (
    <div className="color-picker">

      {colors.map((item) => (
        <button
          key={item}
          className="color-button"
          style={{ backgroundColor: item }}
          onClick={() => setColor(item)}
        >
        </button>
      ))}

    </div>
  );
}

export default ColorPicker;