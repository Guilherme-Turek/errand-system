const form = document.getElementsByTagName('form')[0];

const username = document.getElementsByTagName('input')[0];
const password = document.getElementsByTagName('input')[1];

const messageUsername = document.getElementById('msg-username');
const messagePassword = document.getElementById('msg-password');

const account = JSON.parse(localStorage.getItem('users-list'));

form.addEventListener('submit', (e) => {
    e.preventDefault();


    if(!username.value){
        messageUsername.textContent = 'Por favor, preencha o campo de usuário!';
    } else {
        messageUsername.textContent = '';
    }

    if(!password.value){
        messagePassword.textContent = 'Por favor, preencha o campo da senha!';
    } else {
        messagePassword.textContent = '';
    }

   password.classList.remove('error')
    
   
    if (!account) {
        messageUsername.textContent = 'Usuário não encontrado. Verifique usuário e senha ou crie uma conta!';
        username.classList.add('error');
        return
    } else if(account.find(account => account.username === username.value) && account.find(account => account.password === password.value)){
        window.location.href = './scrapbook.html';
        sessionStorage.setItem('user-logged', username.value);
        username.value = '';
        password.classList.remove('error');
        return  
    } 
    messageUsername.textContent = 'Usuário não encontrado. Verifique usuário e senha ou crie uma conta!';
    username.classList.add('error');
    password.classList.add('error');

});