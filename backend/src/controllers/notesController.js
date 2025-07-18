import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  // as here we used in paramters req, but it was not being used, so we used _, good practice.
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // It means newly created notes show first. by default it was 1 so before, showing newly created at last
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error getting Notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error getting note by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating Note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating Note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const DeletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!DeletedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
