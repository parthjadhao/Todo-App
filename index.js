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
function removeAtIndex(arr, index) {
     let newTodo = []
     for (let i = 0; i < arr.length; i++) {
          if (i != index) {
               newTodo.push(arr[i])
          }
     }
     return newTodo;
}

app.get('/todos', (req, res) => {
     fs.readFile("todos.json", "utf8", (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data));
     });
});

app.post('/todos', (req, res) => {
     const newTodo = {
          id: Math.floor(Math.random() * 1000000), // unique random id
          title: req.body.title,
          description: req.body.description
     };
     fs.readFile("todos.json", "utf8", (err, data) => {
          if (err) throw err;
          const todos = JSON.parse(data);
          todos.push(newTodo);
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
               if (err) throw err;
               res.status(201).json(newTodo);
          });
     });
});

app.delete('/todos/:id', (req, res) => {

     fs.readFile("todos.json", "utf8", (err, data) => {
          if (err) throw err;
          const todos = JSON.parse(data);
          const todoIndex = findIndex(todos, parseInt(req.params.id));
          if (todoIndex === -1) {
               res.status(404).send();
          } else {
               todos = removeAtIndex(todos, todoIndex);
               fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
                    if (err) throw err;
                    res.status(200).send();
               });
          }
     });
});

//[methode-1]solving cors error
app.get("/", (req, res) => {
     // import path
     res.sendFile(path.join(__dirname, "index.html"))
})
app.listen(port, () => {
     console.log(`Example app listening 	
     on port ${port}`)
})