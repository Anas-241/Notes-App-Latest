import { useState } from "react";
import ColorPicker from "./ColorPicker"

function NoteForm({ addNote }) {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [color, setColor] = useState("#fff9c4");

  function handleSubmit(e) {

    e.preventDefault();

    if (content.trim() === "") {
      return;
    }

    addNote(title, content, color);

    setTitle("");
    setContent("");
    setColor("#fff9c4");
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ColorPicker
        color={color}
        setColor={setColor}
      />

      <button type="submit">
        Add Note
      </button>

    </form>
  );
}

export default NoteForm;