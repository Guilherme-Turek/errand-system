const nameUserLogged = sessionStorage.getItem('user-logged');
const welcome       = document.getElementsByTagName('p')[0];
welcome.textContent = `Bem vindo, ${nameUserLogged}`;

if(!nameUserLogged){
    location.href = 'index.html'
}

const usersArray = JSON.parse(localStorage.getItem('users-list'));
const userLogged = usersArray.find(usersArray => usersArray.username === nameUserLogged);
let tasksArray = userLogged.tasks;

const description     = document.getElementById('input-description');
const detailing       = document.getElementById('input-detailing');
const message         = document.getElementById('message');
const tbody           = document.getElementById('list'); 
const saveButton      = document.getElementsByTagName('button')[1];


function createTasks(tasksArray) {

    tbody.innerHTML = ''

    let count = 1;

    tasksArray.forEach(task => {

        tbody.innerHTML += 
        `
            <tr>
                <td>${count}</td>
                <td>${task.descricao}</td>
                <td>${task.detalhamento}</td>
                <td>
                    <button onclick= "editTask(${task.id})">Editar</button>
                    <button onclick= "eraseTask(${task.id})">Apagar</button>
                </td>
            </tr>
        `
        count ++

    })
};

createTasks(tasksArray);

function addTask() {

        task = {
        id: Math.floor(Date.now() / 1000),
        descricao : description.value,
        detalhamento: detailing.value,
        };

        tasksArray.push(task);
        localStorage.setItem('users-list', JSON.stringify(usersArray));
        
        description.value = '';
        detailing.value   = '';

        createTasks(tasksArray);
    
};

saveButton.addEventListener('click', (e) => {

    e.preventDefault()

    if(!description.value || !detailing.value){
        message.textContent = 'Por favor, preencha os dois campos'
        message.style.color = 'red'
        return
    }

    addTask()

    message.textContent = 'Tarefa salva com sucesso!'
    message.style.color = 'green'
    description.value   = ''
    detailing.value     = ''

});

function editTask(id) {

    const div = document.getElementsByClassName('inputs-area')[0]
    const buttonEdit = document.createElement('button')
    buttonEdit.textContent = 'Confirmar';
    const cancelEdit = document.createElement('button')
    cancelEdit.textContent = 'Cancelar';

    div.replaceChild(buttonEdit, saveButton)
    div.appendChild(cancelEdit)

    message.textContent = `Modo de edição ativo.`
    message.style.color = 'black'
    description.focus();

    buttonEdit.addEventListener('click', () => {
        let findEdit = tasksArray.findIndex((task) => task.id === id);
    
        tasksArray[findEdit].descricao = description.value
        console.log(tasksArray[findEdit].descricao)
        tasksArray[findEdit].detalhamento = detailing.value
        console.log(tasksArray[findEdit].detalhamento)

        localStorage.setItem('users-list', JSON.stringify(usersArray));

        alert('Edição feita com sucesso!')
        location.reload()
        createTasks(tasksArray);
    });

    cancelEdit.addEventListener('click', () => {
        alert('Edição cancelada!')
        location.reload()
    })

    
};
 
function eraseTask(id) {
    let findTask = tasksArray.findIndex((task) => task.id === id);

    const newTasksArray = [];

    if(findTask != -1){
        tasksArray.splice(findTask, 1)
        location.reload()
    };

    localStorage.setItem('users-list', JSON.stringify(usersArray));

    tasksArray = newTasksArray
    createTasks(tasksArray)
};