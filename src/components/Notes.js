import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import Addnote from './Addnote'



const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context

    useEffect(() => {
        getNotes()
       
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    //const [note, setNotes] = useState({ id: notes._id, etitle: notes.title, edescription: notes.description, etag: notes.tag })

    const updateNotes = async (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }



    const handleClick =  (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }


    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">  
                                    <label htmlFor="title" className="form-label">title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 ">
                <h1>
                    your notes
                </h1>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNotes={updateNotes} notes={notes} />
                })}
            </div>
        </>
    )
}

export default Notes