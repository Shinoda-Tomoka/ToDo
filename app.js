const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = new mongoose.Schema({
    title: String, 
    limit_day: String, 
    limit_time: String, 
    importance: String
});
const Todo = mongoose.model('Todo', todoSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));

//一覧表示
app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('index', { todos });
});

app.get('/new', (req, res) => {
    res.render('new');
});

//新規追加
app.post('/' ,async (req, res) => {
    const { title, limit_day, limit_time, importance } = req.body;
    await Todo.create({ title, limit_day, limit_time, importance });
    res.redirect('/');
});

app.listen(3000, () => console.log('http://localhost:3000 でサーバー起動'));
