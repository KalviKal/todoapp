const {loeTodoAndmed, lisaTodoData, muudaTodoData} = require('../data')

const tagastaTodod = async (req, res) => {
    const todod = await loeTodoAndmed()
    //console.log(todod)
    res.json(todod)
}


const lisaTodo = (req, res) => {
    console.log(req.body)
    lisaTodoData({
        nimetus: req.body.nimetus, 
        prioriteet: req.body.prioriteet, 
        kasTehtud: "false"
    })
    res.status(201).end()
}

async function muudaTodoCtrl(req, res) {
    if (!req.params.id){
        res.status(403).end({error: "todo id'd ei ole antud"})
    }

    if (!req.body.prioriteet) {
         prioriteet = null
         console.log("Prioriteet " + prioriteet)
    }
    else {prioriteet = req.body.prioriteet
        console.log("Prioriteet " + prioriteet)
    }
    if (!req.body.kasTehtud){
        kasTehtud = null
        console.log("kasTehtud " + kasTehtud)
    }
    else {kasTehtud = req.body.kasTehtud
        console.log("kasTehtud " + kasTehtud)
    }

    const result = await muudaTodoData(req.params.id, prioriteet, kasTehtud)
    //console.log(result)
    if (result){
        res.status(200).end()
    } else {
        console.log(result)
        res.status(401).end("Todo muutmine ebaõnnestus")
    }
}


module.exports = {
    tagastaTodod,
    lisaTodo,
    muudaTodoCtrl
}