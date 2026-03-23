const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Waheguru@083',
    database:'testDb'
})

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Connection has been created')

    const createQuery=`
    CREATE TABLE IF NOT EXISTS Students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(50) UNIQUE,
        age INT
        )   
    `

    connection.execute(createQuery,(err)=>{
        if(err){
            console.log(err)
            connection.end()
            return
        }
        console.log('Table is created')
    })

    
    
})

module.exports=connection;  