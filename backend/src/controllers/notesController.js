export function getAllNotes (req, res) {
  res.status(200).send("You just fetched all notes!");
}

export function createNote (req, res) {
  res.status(201).json({ message: "Note created successfully!" });
}

export function updateNote (req, res) {
  const noteId = req.params.id;
  res.status(200).json({ message: `Note with ID ${noteId} updated successfully!` });
}

export function deleteNote (req, res) {
  const noteId = req.params.id;
  res.status(200).json({ message: `Note with ID ${noteId} deleted successfully!` });
}