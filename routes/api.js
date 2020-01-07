const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Todo = require('../models/todo')

const db = 'mongodb+srv://userlogin:userpassword@cluster0-l5qfr.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, err =>{
    if(err){
        console.error('Error!' + err)
    }
    else{
        console.log('Connected to mongo')
    }
});


router.get('/', (req, res)=> {
    res.send('from API route')
})

router.post('/newtodo', (req, res)=>{
    let todoData = req.body
    let todo = new Todo(todoData)
    todo.save((error, createdTodo) => {
        if(error){
            console.error('error ' + error)
        }
        else{
            res.status(200).send(createdTodo)
        }
    })
})

router.post('/newuser', (req, res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, createdUser) => {
        if(error){
            console.error('error ' + error)
        }
        else{
            res.status(200).send(createdUser)
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body
    console.log(userData)
    User.findOne({login: userData.login}, (error, user)=>{
        if(error){
            console.error(error)
        }
        else{
            if(!user){
                res.status(401).send('')
            }
            else{
                if(user.password !== userData.password){
                    res.status(401).send('')
                }
                else{
                    res.status(200).send(user)
                }
            }
        }
    })
})


router.get('/todos', (req, res) => {
    console.log(1);
    Todo.find({},(error, todos) => {
        todos.forEach(function(v){ delete v.__v; delete v._id });        
        if(error){
            console.error(error)
        }
        else{
            res.json(todos)
        }
    })
})

router.put('/marktodo', (req, res) => {
    console.log(req.body)
    let todoToMark = req.body
    Todo.findOne({id: todoToMark.id}, (error, result) => {
        Todo.updateOne({id: todoToMark.id}, {isDone: !result.isDone}, (error, result) => {
            if(error){
                console.error(error)
            }
            else{
                res.send({text: 'Updated'})
            }
        })
    })
    
})

router.put('/edittodo', (req, res) => {
    console.log(req.body)
    let todoToMark = req.body
    Todo.updateOne({id: todoToMark.id}, {text: todoToMark.text}, (error, result) => {
        if(error){
            console.error(error)
        }
        else{
            res.send({text: 'Updated'})
        }
    })
})

router.post('/deletetodo', (req, res) => {
    console.log(req.body)
    let todoToMark = req.body
    Todo.deleteOne({id: todoToMark.id}, (error, result) => {
        if(error){
            console.error(error)
        }
        else{
            res.send({text: 'Deleted'})
        }
    })
})
module.exports = router