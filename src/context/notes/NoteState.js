import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000/"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {

    // API call

    const response = await fetch(`${host}api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZDA0YTdhODYxMGUzYWFhMzJmYTBhIn0sImlhdCI6MTY5MTE1Nzk2OX0.23syByc0M2J74xt2RE6GNEsXdCacoOTWskMtbnZfUdc"
      }
    });
    const json =  await response.json();
    console.log(json)
    setNotes(json)
  }

  // add note
  const addNote = async (title, description, tag) => {

    // API call

    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZDA0YTdhODYxMGUzYWFhMzJmYTBhIn0sImlhdCI6MTY5MTE1Nzk2OX0.23syByc0M2J74xt2RE6GNEsXdCacoOTWskMtbnZfUdc"
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("adding a new note !")
    const Newnotes = {
      "_id": "64c11a8d639b63782125faf1",
      "user": "64bfc72982d54fae7242817e2",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-07-26T13:07:25.555Z",
      "__v": 0
    }
    setNotes(notes.concat(Newnotes))
  }

  // delete note
  const deleteNote = async (id) => {
    console.log("deleting note of id " + id)
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNotes)
  }

  // edit note
  const editNote = async (id, title, description, tag) => {

    // API call

    const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZDA0YTdhODYxMGUzYWFhMzJmYTBhIn0sImlhdCI6MTY5MTE1Nzk2OX0.23syByc0M2J74xt2RE6GNEsXdCacoOTWskMtbnZfUdc"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();

    // logic to edit notes
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }

  }

}

return (
  <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
    {props.children}
  </noteContext.Provider>
)

}


export default NoteState;