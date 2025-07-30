import mangoose from 'mongoose';


// 1st step: Define the schema for the Note model
// 2nd step: Create the model using the schema
// 3rd step: Export the model for use in other parts of the application
// 4th step: Use the model to interact with the database

const noteSchema = new mangoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  }
},{timestamps: true});

const Note = mangoose.model("Note", noteSchema);

export default Note;