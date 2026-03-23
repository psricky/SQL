const express=require('express')
const app=express() 
const db=require('./utils/dbConnection')
const studentRoutes=require('./routes/studentsRoutes')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/students',studentRoutes)


app.listen(3000,(err)=>{
    console.log('Server is running')
})

