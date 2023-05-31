function goToChat() {
    window.location.href = '/chat?token=' + sessionStorage.getItem('chatToken');
}

function goToAdmin() {
    window.location.href = '/user_management.html?token=' + sessionStorage.getItem('chatToken');
}

async function fetchOption(method, url, payload, token) {
    let options = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }

    }
    if (method != 'GET') {
        options.body = JSON.stringify(payload)
    }
    if (token) {
        options.headers.authorization = token
    }
    try {
        const apiCall = await fetch(url, options);
        if (apiCall.status !== 200) {
            window.location.href = '/login';
            return null;
        }
        return await apiCall.json();
    } catch (err) {
        throw err;

    }


}