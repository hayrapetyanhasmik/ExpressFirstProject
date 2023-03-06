const express = require('express');
const sqlite = require('sqlite3').verbose();
const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = new sqlite.Database('database.db', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Ok");
    }
})

app.get('/coffee', (req,res)=>{
    db.all('SELECT * FROM coffee', [], (err, rows)=>{
        res.send(rows)
    })
})


app.get('/coffee/:id', (req, res) => {
    const id=req.params.id
    db.get('SELECT * FROM coffee WHERE id=?', [id],(err, rows)=>{
    res.send(rows)
 })
})


app.post('/coffee/create', (req,res)=>{
    db.run('INSERT INTO coffee(src,name,price,description)VALUES(?,?,?,?)', [req.body.src,req.body.name,req.body.price,req.body.description],(err)=>{
    res.send("successful completion")
 })
})

app.put('/coffee/update/:id', (req,res)=>{
    db.run('UPDATE coffee SET src=?,name=?,price=?,description=? WHERE id=?', [req.body.src,req.body.name,req.body.price,req.body.description,req.params.id],(err)=>{
    res.send("successful completion")
 })
})

app.delete('/coffee/del/:id', (req,res)=>{
    db.run('DELETE FROM coffee WHERE id=?', [req.params.id],(err)=>{
    res.send("successful completion")
 })
})


app.listen(port);


