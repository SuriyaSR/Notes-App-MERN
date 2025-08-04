import Note from '../models/Note.js';

export async function getAllNotes (_, res) {
  try{
    const notes = await Note.find().sort({ createdAt: -1 }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Error fetching notes." });
  }
}

export async function getNoteById (req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Error fetching note." });
  }
}

export async function createNote (req, res) {
  try{
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log("Error in createNote controller:", error);
    res.status(500).json({ message: "Error creating note." });
  }
}

export async function updateNote (req, res) {
  try{
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(updatedNote);  
  } catch (error) {
    console.log("Error in updateNote controller:", error);
    res.status(500).json({ message: "Error updating note." });
  }
}

export async function deleteNote (req, res) {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.log("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Error deleting note." });
  }
}