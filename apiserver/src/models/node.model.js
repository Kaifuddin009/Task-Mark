import pool from "../database/db.js";

const getAllNotes = async()=>{
  const [rows] = await pool.execute('SELECT * FROM Notes');
  return rows;
}
const getNote = async(id)=>{
  const [rows] = await pool.execute('SELECT * FROM Notes WHERE id = ?',[id]);
  return rows[0];
}
const createNote =async(title, content)=>{
  const [result] = await pool.execute(`INSERT INTO Notes(title, content) VALUES(?,?)`,[title, content]);
  const [note] = await pool.execute(`SELECT * FROM Notes WHERE id =?`,[result.insertId])
  return note[0];
}
const updateNote = async(id, title, content)=>{
await pool.execute(`UPDATE Notes SET title =?, content =? WHERE id =?`,[ title, content,id]);
const note = await getNote(id);
return note;
}

const delNote = async(id)=>{
  const [result] = await pool.execute(`DELETE FROM Notes WHERE id =?`,[id]);
  return result.affectedRows;
}

export {
  getAllNotes,getNote,updateNote, createNote, delNote
}