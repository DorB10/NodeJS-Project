function handleEnter(e) {
    if (e.KeyCode === 13) {
        login()
    }
}

async function login() {

    let email = document.getElementsByName('loginname')[0].value;
    let password = document.getElementsByName('password')[0].value;
    console.log(email, password);

    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    console.log(response.status)
    if (response.status == 200) {
        document.getElementById('ErrorLogin').classList.remove("show");
        let result = await response.json();
        token = result.token;
        sessionStorage.setItem('chatToken', token);
        window.location.href = '/chat?token=' + token;

    } else {
        document.getElementById('ErrorLogin').classList.add("show");
    }

    return false;
}