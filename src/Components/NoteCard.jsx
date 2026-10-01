function NoteCard({
  note,
  deleteNote,
  startEdit,
  editingId,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  saveEdit,
}) {

  const isEditing = editingId === note.id;

  return (
    <div
      className="note-card"
      style={{ backgroundColor: note.color }}
    >

      {isEditing ? (

        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <button onClick={() => saveEdit(note.id)}>
            Save
          </button>

        </>

      ) : (

        <>
          <h2>{note.title}</h2>

          <p>{note.content}</p>

          <div className="note-actions">

            <button onClick={() => startEdit(note)}>
              Edit
            </button>

            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>

          </div>
        </>

      )}

    </div>
  );
}

export default NoteCard;