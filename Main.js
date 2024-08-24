/******* Targetting required elements ******/
const notesContainer = document.querySelector(".notesContainer"),
    addNoteBtn = document.getElementById("addNoteBtn");

/******* Event listeners ******/
window.addEventListener("DOMContentLoaded", showSavedNotes)
addNoteBtn.addEventListener("click", addNewNote)

/******* Function declarations ******/
function showSavedNotes() {
    getNotes().forEach(saved_note => {
        const savedNote = createNewElement(saved_note.id, saved_note.content)
        notesContainer.insertBefore(savedNote, addNoteBtn)
    })
}
// Get saved notes
function getNotes() {
    return JSON.parse(localStorage.getItem("Sticky-note-notes") || '[]')
}

// Function for create a new textarea
function addNewNote() {
    let notes = getNotes();
    let d = new Date();
    const noteObjct = {
        "id": d.getTime(),
        "content": ""
    }

    const noteElement = createNewElement(noteObjct.id, noteObjct.content)

    notesContainer.insertBefore(noteElement, addNoteBtn)
    notes.push(noteObjct)
    saveNote(notes)
}


function saveNote(note) {
    localStorage.setItem("Sticky-note-notes", JSON.stringify(note))
}


function updateNote(noteId, noteContent) {
    let savedNotes = getNotes();
    let targetNote = savedNotes.filter(note => (note.id === noteId))[0];
    targetNote.content = noteContent
    saveNote(savedNotes)
}


function deleteNote(id, element) {
    const savedNotes = getNotes()
    const delNote = savedNotes.forEach((n, index) => {
        if (n.id === id)
            savedNotes.splice(index, 1)
    })
    saveNote(savedNotes)
    element.remove()
}


function createNewElement(noteId, content) {
    const newNoteElement = document.createElement("textarea");
    newNoteElement.setAttribute("placeholder", "Take note")
    newNoteElement.value = content

    newNoteElement.addEventListener("change", () => updateNote(noteId, newNoteElement.value))

    newNoteElement.addEventListener("dblclick", () => deleteNote(noteId, newNoteElement))
    return newNoteElement
}