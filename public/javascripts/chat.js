let globalUser = null;

function logout() {
    window.location.href = "/logout";
}
async function getLoggedUser() {
    let params = new URLSearchParams(document.location.search);
    let token = params.get('token');
    try {
        const user = await fetchOption('GET', 'http://localhost:3000/users/getLoggedUser', null, token);
        return user;
    } catch (error) {
        console.log(error);
    }
}

const socket = io();

async function init() {
    const user = await getLoggedUser();
    socket.emit('ucon', user);
    globalUser = user;
}

function getUser() {
    // return JSON.parse(localStorage.getItem('user'));
    return globalUser;
}


document.addEventListener('keypress', (e) => {
    if (document.getElementById('message') !== document.activeElement || document.getElementById('message').value === '') {
        return;
    }
    if (e.keyCode === 13) {
        sendMessage();
    }
})
socket.on('userAdded', (users) => {
    console.log(users);
    addUserToList(users);
})
socket.on('users', (users) => {
    console.log(users);
})

function sendMessage() {
    let messageObj = { from: getUser().name, message: document.querySelector('#message').value };
    socket.emit('message', messageObj);
}
socket.on('message', (data) => {
    let div1 = document.createElement('div');
    console.log(data);
    div1.innerHTML = `<b>${data.from}</b>:${data.message}`;
    document.querySelector('.msg_card_body').append(div1);
    document.getElementById("message").value = "";
})

function addUserToList(users) {
    document.querySelector('.user-list ul').innerHTML = '';
    users.forEach((user) => {
        let li = document.createElement('li');
        li.innerHTML = user.name;
        document.querySelector('.user-list ul').append(li);
    })
}
init();