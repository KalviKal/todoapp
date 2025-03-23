
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
    let checked = ""
    vasakPaan += `
    <table id="todod">
            <tr>
                <th>Märgi tehtuks</th>
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
            checked = "checked"
            console.log(done_class)
            }
        else {
            done_class = "notcheckmark"
            done_sign = "X"
            checked = ""
            console.log(done_class)
        }
        vasakPaan += `
        <tr>
            <td><input type="checkbox" class="isDoneCheckBox" data-isDoneCheckBoxId="${id}" name="isDoneCheckbox" onclick="changeStatus(this, ${id})" ${checked}></td>
            <td class="${done_class}" id="todo_${id}" >${done_sign}</td>
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


function changeStatus(checkbox, id) {
    console.log('Checked state:', checkbox.checked); // Debugging line
    if (checkbox.checked === true){
        isChecked = "true"
    } else {
        isChecked = "false"
    }
    //const isChecked = checkbox.checked;
    const todoId = id;
    console.log('Todo ID:', todoId); // Debugging line
    console.log('Checked state:', isChecked); // Debugging line

    const data = { kasTehtud: isChecked };
    console.log(data)
    fetch('/api/todo/' + todoId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response)
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    alert("Staatus muudetud")
    loeTododJaKuvaLeht()
}


/* async function lisaAddEventListerCheckBoxile() {
    

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.isDoneCheckBox');
    console.log('Checkboxes:', checkboxes); // Debugging line

    checkboxes.forEach(function(checkbox) {
        console.log('Attaching event listener'); // Debugging line
        checkbox.addEventListener('change', function() {
            alert('Checkbox changed'); // Debugging line
            const isChecked = this.checked;
            console.log('Checked state:', isChecked); // Debugging line

            const todoId = this.getAttribute('data-isDoneCheckBoxId');
            console.log('Todo ID:', todoId); // Debugging line

            const data = { checkboxState: isChecked };

            fetch('/api/todo/' + todoId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
});

} */

