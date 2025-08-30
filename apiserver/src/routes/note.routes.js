import express from 'express'
import { changeNote, fetchNote, fetchNotes, makeNote, removeNote } from '../controllers/note.controller.js';
const noteRouter = express.Router();

noteRouter.get('/',fetchNotes)
noteRouter.get('/:id',fetchNote)
noteRouter.post('/',makeNote)
noteRouter.patch('/:id',changeNote)
noteRouter.delete('/:id',removeNote)

export default noteRouter;