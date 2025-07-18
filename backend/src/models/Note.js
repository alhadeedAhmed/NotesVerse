import mongoose from "mongoose";
// step 1 - create schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // created at and updated at
  }
);

// step 2 - model based on that schema
const Note = mongoose.model("Note", noteSchema); // "Note" model based on above schema
export default Note;
