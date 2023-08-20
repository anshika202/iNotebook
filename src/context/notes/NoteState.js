import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000/"
  const [notes, setNotes] = useState([])

  const getNotes = async () => {

    // API call

    const response = await fetch(`${host}api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json =  await response.json();
    setNotes(json)
  }

  // add note
  const addNote = async (title, description, tag) => {

    // API call

    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("adding a new note !")

    const json =  await response.json();
    setNotes(notes.concat(json))
  }

  // delete note
  const deleteNote = async (id) => {

    // API call

    const response = await fetch(`${host}api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    // const json =  await response.json();

    console.log("deleting note of id " + id)
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNotes)
  }

  // edit note
  const editNote = async (id, title, description, tag) => {

    // API call

    const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });


    // logic to edit notes

    let NewNote = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = NewNote[index];
    if (element._id === id) {
      NewNote[index].title = title;
      NewNote[index].description = description;
      NewNote[index].tag = tag;
      break;
    }
  }
  setNotes(NewNote)

}

return (
  <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
    {props.children}
  </noteContext.Provider>
)

}


export default NoteState;