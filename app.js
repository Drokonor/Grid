const express = require('express')

const app = express()

app.set("view engine", "ejs")

app.get('/', function(req, res){
    res.render('index')
})

app.post('/create', function(req,res){
    console.log("create")
    res.redirect('/')
})

app.post('/remove', function(req,res){
    console.log("remove")
    res.redirect('/')
})

app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080')
})