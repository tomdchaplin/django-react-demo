import { useState, useEffect } from "react";
import api from "../api";
import Note from '../components/Note'
import "../styles/Home.css";


function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          getNotes()
        } else {
          alert("failed to delete note");
        }
      })
      .catch((error) => alert(error));

  };

  const createNotes = (e) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) console.log("created");
        else alert("Failed to make note");
        getNotes();
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        alert(err);
        setTitle("");
        setContent("");
      });
  };

  return (
    <>
      <div>
        <h2>Notes</h2>
      </div>
      {notes.map((note) => 
        <Note note={note} onDelete={deleteNote} key={note.id}/>
      )}
      <h2>Create a note</h2>
      <form id="main-form" onSubmit={createNotes}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          type="text"
          id="content"
          name="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}

export default Home;
