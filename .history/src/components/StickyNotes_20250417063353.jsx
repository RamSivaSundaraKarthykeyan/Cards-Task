import React, { useState, useEffect, useRef } from "react";
import "../CSS/StickyNotes.css";

function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textareaRefs = useRef({});

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
      x: 50,
      y: 50,
    };
    setNotes([...notes, newNote]);

    setTimeout(() => {
      textareaRefs.current[newNote.id]?.focus();
    }, 0);
  };

  const handleMouseDown = (e, id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setDraggingId(id);
      setOffset({
        x: e.clientX - note.x,
        y: e.clientY - note.y,
      });
    }
  };

  const removeSN = (id) => {
    setNotes((prev) => prev.filter((sn) => sn.id !== id));
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
          border: "none",
          background: "#202020",
          borderRadius: "10px",
          overflow: "hidden",
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
              ref={(el) => (textareaRefs.current[note.id] = el)}
              value={note.content}
              onChange={(e) => updateContent(note.id, e.target.value)}
              placeholder="Enter your note"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                border: "none",
                resize: "none", // Disable resizing
                outline: "none",
                color: "black",
                overflow: "hidden", // Prevent scrollbars
                display: "block",
                whiteSpace: "normal", // Allow text to wrap within the box
                wordWrap: "break-word", // Break long words to fit the width
                textAlign: "left", // Align text to the left
                lineHeight: "1.5", // Adjust for better spacing
              }}
            />
            <button className="remove-button" onClick={() => removeSN(note.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyNotes;
