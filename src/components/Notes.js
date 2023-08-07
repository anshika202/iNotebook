import React, { useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import Addnote from './Addnote'



const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getNotes} = context

    useEffect(() => {
      getNotes()
    }, [])
    

    return (
        <>
            <Addnote />
            <div className="row my-3 ">
                <h1>
                    your notes
                </h1>
                {notes.map((notes) => {
                    return <NoteItem notes={notes} />
                })}
            </div>
        </>
    )
}

export default Notes