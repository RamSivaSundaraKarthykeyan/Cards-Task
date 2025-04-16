import React, { useState, useEffect, useRef } from "react";

function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
      x: 200,
      y: 200,
    };
    setNotes([...notes, newNote]);
  };

  const handleMouseDown = (e, id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setDraggingId(id);
      offsetRef.current = {
        x: e.clinetX - note.x,
        y: e.clientY - note.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingId !== null) {
        const newX = e.clientX - offsetRef.x;
        const newY = e.clientY - offsetRef.y;
        console.log("New X:", newX, " New Y:", newY);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === draggingId
              ? {
                  ...note,
                  x: newX,
                  y: newY,
                }
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
  }, [draggingId]);

  const updateContent = (id, content) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <button onClick={addNote} style={{ marginBottom: "20px" }}>
        Add Sticky Note
      </button>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#202020",
          margin: 0,
          padding: 0,
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
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              cursor: "move",
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
