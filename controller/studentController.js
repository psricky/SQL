const connection = require('../utils/dbConnection')
const db=require('../utils/dbConnection')

const addEntries=(req,res)=>{

   const {name,email,age}=req.body
   const insertQuery='INSERT INTO students(name,email,age) VALUES (?,?,?)'

   db.execute(insertQuery,[name,email,age],(err)=>{
    if(err){
        console.log(err.message)
        res.status(500).send(err.message)
        connection.end()
        return
    }
    console.log('Value has been inserted')
    res.status(200).send(`Student with name ${name} successfully added`)
   })
}

const getStudents=(req,res)=>{
    const getQuery=`SELECT * FROM students`
    db.execute(getQuery,(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }
        console.log('Students data fetched')
        res.status(200).json(result)
    })
}

const getStudentById=(req,res)=>{
    const {id}=req.params
    const getQueryById=`
        SELECT * FROM students
        WHERE id=?
    `
    db.execute(getQueryById,[id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }
        if(result.length===0){  //use when u run a select query
            res.status(404).send('Student not found')
            return
        }
        console.log('Student data fetched')
        res.status(200).json(result)
    })
}

const updateEntry=(req,res)=>{
    const {id}=req.params
    const {name,email}=req.body
    const updateQuery=`
        UPDATE students
        SET name=? , email=?
        WHERE id=?
    `
    db.execute(updateQuery,[name,email,id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }
        if(result.affectedRows===0){
            res.status(404).send('Student not found')
            return
            
        }
    const selectQuery=`
        SELECT * FROM students 
        WHERE id=?
    `
    db.execute(selectQuery,[id],(err,rows)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }
        console.log('Student has been updated')
        res.status(200).json(rows[0])
    })
        
    })
}

const deleteEntry=(req,res)=>{
    const {id}=req.params
    const deleteQuery=`
        DELETE FROM students
        WHERE id=?
    `
    db.execute(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }
        if(result.affectedRows===0){
            res.status(404).send('Student not found')
            return
        }
        res.status(200).send(`Student with id ${id} deleted from database`)
    })
}

module.exports={
    addEntries,
    getStudents,
    getStudentById,
    updateEntry,
    deleteEntry
}