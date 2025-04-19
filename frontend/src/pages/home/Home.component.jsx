import { useState, useEffect } from 'react'
import api from '../../api/api'
import Note from '../../components/Note/Note.component'

import './Home.styles.scss'


function Home(){
    const [ notes, setNotes ] = useState([])
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => setNotes(data))
            .catch((error) => alert(error))
    }

    const createNote = () => {
        api.post("/api/notes/", {title, content})
            .then((res) => {
                if (res.status === 201) alert("Successfully created note!");
                else alert("Failed to make note");
                getNotes();
            })
            .catch ((error) => alert(error));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note");
                getNotes();
            })
            .catch ((error) => alert(error));
    }

    return <>
        <div>
            <h2>Create Note</h2>
            {
                notes.map((note) => <Note key={note.id} note={note} onDelete={deleteNote} />)
            }
        </div>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label> <br />
            <input
                type="text"
                id="title"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
            /> <br />

            <label htmlFor="title">Content:</label> <br />
            <textarea
                id="content"
                value={content}
                name="content"
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea><br />
            
            <input type="submit" value="submit" />

        </form>

    </>
}

export default Home;