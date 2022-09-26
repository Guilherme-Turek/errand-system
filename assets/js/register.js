let usersList = JSON.parse(localStorage.getItem('users-list')) || [];

const form = document.getElementsByTagName('form')[0];

const username = document.getElementsByTagName('input')[0];
const password = document.getElementsByTagName('input')[1];
const confirmP  = document.getElementsByTagName('input')[2];

const spanUsername = document.getElementById('span-username');
const spanPassword = document.getElementById('span-password');
const spanConfirm  = document.getElementById('span-confirm');

const messageUsername = document.getElementById('msg-username');
const messagePassword = document.getElementById('msg-password');
const messageConfirm  = document.getElementById('msg-confirm');

username.addEventListener('change', () => {
    if(username.value.length < 4){
        messageUsername.textContent = 'O usuário precisa ter no minímo 4 caracteres!';
        username.classList.add('error');
    } else {
        messageUsername.textContent = '';
        spanUsername.style.display  = 'none';
        username.classList.replace('error', 'sucess');
        username.classList.add('sucess');
    }
});

password.addEventListener('change', () => {
    if(password.value.length < 6){
        messagePassword.textContent = 'A senha precisa ter no minímo 6 caracteres!';
        password.classList.add('error');
    } else {
        messagePassword.textContent = '';
        spanPassword.style.display  = 'none';
        password.classList.replace('error', 'sucess');
    }
});

confirmP.addEventListener('change', () => {
    if(confirmP.value != password.value){
        messageConfirm.textContent  = 'As senhas não coincidem!';
        messagePassword.textContent = 'As senhas não coincidem!';
        confirmP.classList.add('error');
        password.classList.add('error');
    } else {
        messageConfirm.textContent  = '';
        messagePassword.textContent = '';
        spanConfirm.style.display   = 'none';
        confirmP.classList.remove('error');
        password.classList.remove('error');
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!username.value){
        messageUsername.textContent = 'Por favor, preencha o campo de usuário!';
    } else if(username.value.length < 4){
        messageUsername.textContent = 'O usuário precisa ter no minímo 4 caracteres!';
    } else {
        messageUsername.textContent = '';
        spanUsername.style.display  = 'none';
    }

    if(!password.value){
        messagePassword.textContent = 'Por favor, preencha o campo da senha!';
    } else {
        messagePassword.textContent = '';
        spanPassword.style.display  = 'none';
    }

    if(!confirmP.value){
        messageConfirm.textContent = 'Por favor, preencha o campo da confirmação de senha!';
    } else if(confirmP.value != password.value){
        messageConfirm.textContent  = 'As senhas não coincidem!';
        messagePassword.textContent = 'As senhas não coincidem!';
        confirmP.classList.add('error');
        password.classList.add('error');
    } else{
        messageConfirm.textContent = '';
        spanConfirm.style.display  = 'none';
    }

    if(usersList.find(usersList => usersList.username === username.value)){
        messageUsername.textContent = 'Usuário já existe, tente novamente!'
        return
    }

    if(username.value.length >= 4 && password.value.length >= 6 && confirmP.value == password.value){
        const newUser = {
            username : username.value,
            password : password.value,
            tasks    : [],
        };

        usersList.push(newUser);
        localStorage.setItem('users-list', JSON.stringify(usersList));

        username.value = '';
        password.value = '';
        confirmP.value = '';
        alert('Conta criada com sucesso')
        window.location.href = './index.html';
    
    }
});