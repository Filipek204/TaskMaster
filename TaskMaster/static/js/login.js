
const loginEndpoint = 'http://127.0.0.1:8000/api/login/'
let loginForm = document.getElementById("login-form");



loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
       const res = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
           },
            credentials: 'include',
            body: JSON.stringify({
                'username': e.target.Username.value,
                'password': e.target.Password.value,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
                console.log("problem");
                return;
        }
        window.localStorage.setItem("token", data.token);
    } catch(error) {
        console.log(error)
    }
})
