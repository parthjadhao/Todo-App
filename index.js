const express = require('express')
const fs = require('fs')
const bodyparser = require('body-parser')
const app = express();
const port = 3000
// [methode-1]importing path for solving cors error
const path = require('path')
// [methode-2]importing cors to allow backend acces the request from every were

// const cors = require('cors');

// [methode-2]applying cors middle ware which allow the request from other source to hit backend routes

// app.use(cors)
app.use(bodyparser.json())

let todo = []
function findIndex(arr, id) {
     for (let index = 0; index < arr.length; index++) {
          if (arr[index].id == id) {
               return index
          }
     }
     return -1;
}
function removeIndex(arr, index) {
     let newTodo = []
     for (let i = 0; i < arr.length; i++) {
          if (i != index) {
               newTodo.push(arr[i])
          }
     }
     return newTodo;
}

app.get('/todo', (req, res) => {
     fs.readFile("todo.json", "utf-8", (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data))
     })
})

app.post('/todo', (req, res) => {
     const newTodo = {
          "id": Math.floor(Math.random() * 100000000),
          "title": req.body.title,
          "description": req.body.description
     }
     todo.push(newTodo)
     res.status(200).json(todo)
})

app.delete('/todo/:id', (req, res) => {
     const todoIndex = findIndex(todo, parseInt(req.params.id));
     if (todoIndex === -1) {
          res.status(400).send();
     }
     else {
          todo = removeIndex(todo, todoIndex);
          res.status(200).send()
     }
})
//[methode-1]solving cors error
app.get("/", (req, res) => {
     // import path
     res.sendFile(path.join(__dirname, "index.html"))
})
app.listen(port, () => {
     console.log(`Example app listening 	
     on port ${port}`)
})