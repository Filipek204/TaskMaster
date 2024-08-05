
const loginEndpoint = 'http://127.0.0.1:8000/api/token/'
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
        console.log(data)
        window.localStorage.setItem("access", data.access);
        window.localStorage.setItem("refresh", data.refresh);
        window.location.href= "../home"
    } catch(error) {
        console.log(error)
    }
})
