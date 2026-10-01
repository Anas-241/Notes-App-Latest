import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import NoteForm from "./Components/NoteForm";
import NoteCard from "./Components/NoteCard";
import axios from "axios";

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log("Error fetching notes:", error);
      });
  }, []);

  
  async function addNote(title, content, color) {
    const newNote = {
      title: title,
      content: content,
      color: color,
    };

    try {
      const response = await axios.post(API_URL, newNote);

      setNotes([...notes, response.data]);
    } catch (error) {
      console.log("Error adding note:", error);
    }
  }

  
  async function deleteNote(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  }

  
  function startEdit(note) {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

 
  async function saveEdit(id) {
    const updatedNote = {
      title: editTitle,
      content: editContent,
    };

    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        updatedNote
      );

      setNotes(
        notes.map((note) => {
          if (note.id === id) {
            return response.data;
          }

          return note;
        })
      );

      setEditingId(null);
    } catch (error) {
      console.log("Error updating note:", error);
    }
  }

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="app">

      <Header />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <NoteForm addNote={addNote} />

      <div className="notes-container">

        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            startEdit={startEdit}
            editingId={editingId}
            editTitle={editTitle}
            editContent={editContent}
            setEditTitle={setEditTitle}
            setEditContent={setEditContent}
            saveEdit={saveEdit}
          />
        ))}

      </div>

    </div>
  );
}

export default App;