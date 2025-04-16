import React, { useState, useEffect } from "react";

function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
      x: 50,
      y: 50,
    };
    setNotes([...notes, newNote]);
  };

  const handleMouseDown = (e, id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setDraggingId(id);
      setOffset({
        x: e.clinetX - note.x,
        y: e.clientY - note.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingId !== null) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === draggingId
              ? { ...note, x: e.clientX - offset.x, y: e.clientY - offset.y }
              : note
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    if (draggingId !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseDown);
    };
  }, [draggingId, offset]);

  const updateContent = (id, content) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  return (
    <div>
      <button onClick={addNote} style={{ marginBottom: "20px" }}>
        Add Sticky Note
      </button>
      <div
        style={{
          position: "relative",
          height: "100vh",
          border: "1px solid #ddd",
          background: "#f7f7f7",
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            style={{
              position: "absolute",
              top: note.y,
              left: note.x,
              width: "200px",
              minHeight: "150px",
              background: "yellow",
              padding: "10px",
              cursor: "move",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              userSelect: "none",
            }}
          >
            <textarea
              value={note.content}
              onChange={(e) => updateContent(note.id, e.target.value)}
              placeholder="Enter your note"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                border: "none",
                resize: "none",
                outline: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyNotes;
