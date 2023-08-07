import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const Addnote = () => {

  const context = useContext(noteContext)
  const {addNote} = context

  const [notes, setNotes] = useState({ title: "", description: "", tag: "default" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.description, notes.tag)
  }


  const onChange = (e) => {
    setNotes({...notes, [e.target.name] : e.target.value})
  }

  return (
    <div className="container my-3">
      <h2>
        add your note
      </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={onChange} />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
      </form>
    </div>
  )
}

export default Addnote