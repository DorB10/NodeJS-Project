const API = 'http://localhost:3000/users/all'

async function fetchAllUsers() {
    const apiCall = await fetch(API);
    const responseJson = await apiCall.json();
    populateResponse(responseJson);
}

function populateResponse(users) {
    let table = document.querySelector('#userTable tbody');
    if (table.querySelector('tr')) {
        console.log('removed');
        table.querySelectorAll('tr').forEach((tr) => {
            tr.remove();
        });
    }

    let tr, td;
    console.log(users);
    users.forEach((user) => {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = user['name'];
        tr.append(td);
        td = document.createElement("td");
        td.innerHTML = user['email'];
        tr.append(td);
        td = document.createElement("td");
        td.innerHTML = user['phone'];
        tr.append(td);
        td = document.createElement("td");
        td.innerHTML = `<a href='#' onclick=editUser("${user['_id']}")>Edit</a>`;
        tr.append(td);
        td = document.createElement("td");
        td.innerHTML = `<a href='#' onclick=deleteUser("${user['_id']}")>Delete</a>`;
        tr.append(td);


        table.append(tr);
    })
}

async function updateUser() {

    let fullname = document.querySelector('.edit-container input[name="fname"]');
    let phone = document.querySelector('.edit-container input[name="phone"]');
    let userId = document.querySelector('.edit-container input[name="userId"]');
    const user = {
        name: fullname.value,
        phone: phone.value
    }
    const API = `http://localhost:3000/users/update/${userId.value}`;
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    try {
        let result = await fetch(API, options);
        let responseJson = await result.json();
        fetchAllUsers();
    } catch (error) {
        alert('there was a problem ');
    }



}

function populateEditScreen(user) {
    let edit_container = document.querySelector('.edit-container');
    edit_container.classList.remove('hidden');
    let fullname = document.querySelector('.edit-container input[name="fname"]');
    let phone = document.querySelector('.edit-container input[name="phone"]');
    let userID = document.querySelector('.edit-container input[name=userId]');
    userID.value = user._id;
    fullname.value = user.name;
    phone.value = user.phone;
}

async function deleteUser(userID) {
    let confirmation = confirm('Are you sure you want to delete this user?');
    if (!confirmation) return;
    let apiURL = 'http://localhost:3000/users/delete';
    try {
        let results = await fetchOption('DELETE', apiURL, { userID: userID });
        fetchAllUsers();
    } catch (err) {
        console.log('there is an error in your deletion ', err);
    }

}
async function editUser(userID) {
    console.log(userID);
    const API = `http://localhost:3000/users/user?userID=${userID}`;
    const apiCall = await fetch(API);
    const responseJson = await apiCall.json();
    populateEditScreen(responseJson);

}

async function signup() {
    let form = document.querySelector('form');
    if (!form.checkValidity()) {
        return false;
    }
    let name = document.querySelector('input[name="fname"]').value;
    let phone = document.querySelector('input[name="phone"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;
    const payload = {
        name: name,
        phone: phone,
        email: email,
        password: password
    }
    let url = 'http://localhost:3000/users/new';
    try {
        let results = await fetchOption('POST', url, payload);
        alert('User has been added');
        fetchAllUsers();

    } catch (err) {
        console.error('there is an error in your signup', err);
    }
}

fetchAllUsers();