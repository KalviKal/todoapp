
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
    
}





function looLeheHTML(todod) {
    const vasakPaan = looVasakPaanHTML(todod)
    return `
    <div class="row">
        <div class="col-7">
            ${vasakPaan}
        </div>
    </div>
    `
}


function looVasakPaanHTML(todod){
    
    
    let vasakPaan = ''
    let id = 0
    let done_class = ""
    let done_sign = ""
    vasakPaan += `
    <table id="todod">
            <tr>
                <th>Tehtud</th>
                <th>Todo ID</th>
                <th>KasTehtud</th>
                <th>Nimetus</th>
                <th>Prioriteet</th>
            </tr>`
    for (todo of todod) {
        if (todo.kasTehtud === "true")
            {done_class = "checkmark",
            done_sign = ""   
            console.log(done_class)
            }
        else {
            done_class = "notcheckmark"
            done_sign = "X"
            console.log(done_class)
        }
        vasakPaan += `
        <tr>
            <td class="${done_class}" id="${id}" >${done_sign}</td>
            <td>${id}</td>
            <td>${todo.kasTehtud}</td>
            <td>${todo.nimetus}</td>
            <td>${todo.prioriteet}</td>
        </tr>
        `
        id += 1
    }  
    vasakPaan += `</table>`        
        
        
    
    return vasakPaan
}



loeTododJaKuvaLeht()


async function lisaTodo(){
    const todoNimetus = document.getElementById('todoNimetus').value
    console.log(todoNimetus)
    const todoPrioriteet = document.getElementById('todoPrioriteet').value
    console.log(todoPrioriteet)
    const uusTodo = {
        "nimetus": todoNimetus,
        "prioriteet": todoPrioriteet
    }
    
    const response = await fetch(`/api/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uusTodo)
    })

    if (response.status === 201){
        alert(todoNimetus + ': Todo lisatud')
        console.log(response)
    }
    else {
        alert('ToDo lisamine ebaõnnestus')
        console.log(response)
    }
    loeTododJaKuvaLeht()
    


}