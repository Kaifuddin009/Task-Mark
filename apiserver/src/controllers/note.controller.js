import * as Note from '../models/node.model.js';

const fetchNotes = async(req, res)=>{
  try {
    const notes = await Note.getAllNotes();
    if (!notes) {
      return res.status(404).json({success:false, message:'NO Notes Found'})
    }
    return res.status(200).json({success:true, notes})
  } catch (error) {
    return res.status(500).json({success:false, message:error.message})
  }
}

const fetchNote = async(req, res)=>{
  try {
    const {id} = req.params;
    const note = await Note.getNote(id);
    if (!note) {
     return res.status(404).json({success:false, message:'Notes not  Found'}) 
    }
    return res.status(200).json({success:true, note})
  } catch (error) {
    return res.status(500).json({success:false, message:error.message})
  }
}

const makeNote =async(req, res)=>{
  try {
    const {title, content}  = req.body;
    if (!title) {
      return res.status(400).json({success:false, message:'title is required'})
    }
    const note = await Note.createNote(title, content);
    return res.status(201).json({success:true, note})
  } catch (error) {
    return res.status(400).json({success:false, message:error.message})
  }
}

const changeNote = async(req, res)=>{
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    if (!title && !content) {
      return res.status(404).json({success:false, message:'required feild'});
      }
      const note = await Note.updateNote(id, title, content);
      return res.status(200).json({success:true, note})
  } catch (error) {
      return res.status(404).json({success:false, message:error.message})
  }
}

const removeNote = async(req, res)=>{
  try {
    const {id} = req.params;
    const deleted = await Note.delNote(id);
    if (!deleted) {
      //const note = await Note.updateNote(id, title, content);
      return res.status(404).json({success:false, message:'Something Went wrong while deleting a Note'})
    }
      return res.status(200).json({success:true, message:'Note deleted Successsfully'})
  } catch (error) {
      return res.status(500).json({success:false, message:error.message})
  }
}
export{
  fetchNote, fetchNotes, changeNote, makeNote, removeNote
}