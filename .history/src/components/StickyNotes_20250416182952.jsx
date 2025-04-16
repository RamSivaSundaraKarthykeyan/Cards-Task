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
}
