const listEndpoint = 'http://127.0.0.1:8000/api/list/'
const profileEndpoint = 'http://127.0.0.1:3000/api/profile/'
btn = document.getElementById("create-list");
modal = document.getElementById("popup-add-list-container");
form = document.getElementById("form");
closeListForm = document.getElementById("close");
const navList = document.getElementById("lists")

async function profileInfo(url) {
    try {
       const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.stringify(window.localStorage.getItem('access'))
           },
        });
        const data = await res.json();
        if (!res.ok) {
                console.log("problem");
                return;
        }
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}


async function navLists(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
    
        for (let list of data) {
            navList.innerHTML += `
                <a class="nav-element" id="list-list" href="/list/${list.id}">
                    <img src=${imgSrc} alt="list icon" class="icon" id="list-icon">
                    <p class="nav-text">${list.title}</p>
                </a>`
                ;
        }

    } catch(error) {
        console.log(error)
    }
}
navList.onload = profileInfo(profileEndpoint)
navList.onload = navLists(listEndpoint)
btn.onclick = function () {
    modal.style.display = "block";
}
closeListForm.onclick = function () {
    modal.style.display = "none";
}
form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
        const res = await fetch(listEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  window.localStorage.getItem("token"),
            },
            body: JSON.stringify({
                'title': event.target.Title.value,
                'description': event.target.Description.value,
                'user': jwt_decode(window.localStorage.getItem("token")).username,
            }),
        });
        const data = await res.json();
        
        if (!res.ok) {
                console.log("problem");
                return;
        }
        else {
            
        }
        
        console.log(data);
        modal.style.display = "none";
        navList.innerHTML += `
            <li>
                <a class="nav-element" id="list-list" href="/list/${data.id}">
                    <img src=${imgSrc} alt="list icon" class="icon" id="list-icon">
                    <p class="nav-text">${data.title}</p>
                </a>
            </li>`
                ;
    } catch (error) {
        console.log(error);
    }
})
