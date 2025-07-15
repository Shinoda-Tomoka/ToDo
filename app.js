const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = new mongoose.Schema({
    title: String, 
    limit_day: String, 
    limit_time: String, 
    importance: String,
    check: { type: Boolean, default: false}
});
const Todo = mongoose.model('Todo', todoSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

//一覧表示
app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('index', { todos });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.get('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render('edit', { todo });
})

//新規追加
app.post('/' ,async (req, res) => {
    const { title, limit_day, limit_time, importance, check } = req.body;
    await Todo.create({ title, limit_day, limit_time, importance, check });
    res.redirect('/');
});

app.put('/check/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, { check: true });
    res.redirect('/');
});

app.put('/edit/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
})

app.delete('/delete/:id', async(req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

app.listen(3000, () => console.log('http://localhost:3000 でサーバー起動'));
