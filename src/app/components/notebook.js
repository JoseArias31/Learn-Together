"use client"

import { useState, useEffect } from "react"

export default function Notebook() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [editingNote, setEditingNote] = useState(null)
  const [editContent, setEditContent] = useState("")

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.trim() === "") return

    const newNoteObj = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: new Date().toLocaleString(),
    }

    setNotes([...notes, newNoteObj])
    setNewNote("")
  }

  const removeNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const startEditNote = (note) => {
    setEditingNote(note.id)
    setEditContent(note.content)
  }

  const saveEditedNote = (noteId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? { ...note, content: editContent, timestamp: new Date().toLocaleString() + " (edited)" }
          : note,
      ),
    )
    setEditingNote(null)
  }

  const cancelEdit = () => {
    setEditingNote(null)
  }

  const handleKeyDown = (e) => {
    // Add note when pressing Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      addNote()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-2">
          <div className="mb-6">
            <textarea
              placeholder="Type your note here... (Ctrl+Enter to save)"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border border-gray-300 rounded-lg min-h-[150px] text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addNote}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Note
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Notes</h2>

            <div className="h-[400px] overflow-y-auto pr-4">
              {notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-2 bg-white border border-gray-200 rounded-lg relative transition-all  ${
                        editingNote === note.id ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {editingNote === note.id ? (
                        <div className="w-full">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none "
                            autoFocus
                            rows={8}
                          />
                          <div className="flex justify-end gap-2 ">
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-300 text-xs font-bold text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEditedNote(note.id)}
                              className="bg-blue-600 text-xs font-bold text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="whitespace-pre-wrap mb-1 pr-16">{note.content}</div>
                          <div className="text-xs text-gray-500">{note.timestamp}</div>
                          <div className="absolute top-1 right-3 flex gap-1 flex-col">
                            <button
                              onClick={() => startEditNote(note)}
                              className="p-1 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeNote(note.id)}
                              className="p-1 text-xs font-bold text-gray-600 hover:text-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No notes yet. Start typing above to create your first note.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}