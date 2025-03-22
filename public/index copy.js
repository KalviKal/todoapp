
const todoSisu = document.getElementById('todo-sisu')

let todod = []



async function loeTododJaKuvaLeht() {
    const result = await fetch('/api/todo')
    if (!result.ok){
        console.log('Viga andmete lugemisel')
        return;
    }

    todod = await result.json()
    console.log(todod)
    todoSisu.innerHTML = looLeheHTML(todod)
    naitaParemPaan(0)
}





function looLeheHTML(todod) {
    const vasakPaan = looVasakPaanHTML(todod)
    return `
    <div class="row">
        <div class="col-4">
            ${vasakPaan}
        </div>
        <div id="parem-paan-sisu" class="col-8">
            siia tuleb parem paan
        </div>
    </div>
    `
}


function looVasakPaanHTML(todod){
    const todoInfo = `
        <div>
            esimene matk
        </div>
        `
    
    let vasakPaan = ''
    let id = 0
    for (todo of todod) {
        vasakPaan += `
        <div class="vasak-paan-valik" onclick="naitaParemPaan(${id})">
            <h3>${todo.nimetus}</h3>
        </div>
        `
        id += 1
    }
    return vasakPaan
}

function naitaParemPaan(todoId){
    const paremPaan = document.getElementById('parem-paan-sisu')
    const todo = todod[todoId]


    const paremPaanHtml = `
        <h3>ToDo: ${todo.nimetus}</h3>
        <div>Prioriteet: ${todo.prioriteet}</div>
        <div>Kas Tehtud: ${todo.kasTehtud}</div>
    `
    paremPaan.innerHTML = paremPaanHtml
}


loeTododJaKuvaLeht()