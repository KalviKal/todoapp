const {loeTodoAndmed, lisaTodoData} = require('../data')

const tagastaTodod = (req, res) => {
    const todod = loeTodoAndmed()
    console.log(todod)
    res.json(todod)
}


const lisaTodo = (req, res) => {
    console.log(req.body)
    lisaTodoData({
        nimetus: req.body.nimetus, 
        prioriteet: req.body.prioriteet, 
        kasTehtud: req.body.kasTehtud
    })
    res.status(201).end()
}


module.exports = {
    tagastaTodod,
    lisaTodo
}