import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const { notes } = props;
    return (
        <div className="col-md-3" >
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="title">{notes.title}</h5>
                    <p className="description"> {notes.description}</p>
                    <i className="fa-solid fa-trash" onClick={()=>{deleteNote(notes._id)}}></i>
                    <i className=" mx-3 fa-solid fa-pen-to-square"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem