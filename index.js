const express = require("express");
const path = require("path");

const { } =require("./controller");
const {tagastaTodod, lisaTodo } = require('./api_controller');


const app = express();
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3030;
// For API endpoint to understand json input
app.use(express.json())
app.use(express.urlencoded())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {res.render('pages/index')})


// API Endpoints
app.get('/api/test', (req, res) => res.send({sonum: 'test'}))
app.get('/api/todo', tagastaTodod)
app.post('/api/todo', lisaTodo)


app.listen(PORT, () => console.log(`TodoApp Listening on: ${PORT}`))