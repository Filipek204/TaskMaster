const loginEndpoint = "http://127.0.0.1:8000/api/token/"
const form = document.getElementById("login-form");
const user = document.getElementById("user");
form.addEventListener('submit', async event => {
    event.preventDefault();
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    try {
        const res = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
                console.log("problem");
                return;
            }
        
        console.log(data.access);
        localStorage.setItem("token", data.access)
    } catch (error) {
        console.log(error);
    }
})
