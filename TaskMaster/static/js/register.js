const registerEndpoint = "http://127.0.0.1:8000/api/signup/"
const form = document.getElementById("register-form");
const user = document.getElementById("user");
form.addEventListener('submit', async event => {
    event.preventDefault();
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    const email = document.getElementById("Email").value;
    try {
        const res = await fetch(registerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
                console.log("problem");
                return;
            }
        
        user.innerHTML = data.user.username;
    } catch (error) {
        console.log(error);
    }
})
