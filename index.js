const express = require("express");
const path = require("path");


const app = express();
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3030;
// For API endpoint to understand json input
app.use(express.json())

app.use(express.urlencoded())

// Endpoint
app.get('/api/test', (req, res) => res.send({sonum: 'test'}))



app.listen(PORT, () => console.log(`TodoApp Listening on: ${PORT}`))