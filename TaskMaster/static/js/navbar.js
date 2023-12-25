const listEndpoint = 'http://127.0.0.1:8000/api/list/'
btn = document.getElementById("create-list");
modal = document.getElementById("popup-add-list-container");
form = document.getElementById("form");
close = document.getElementById("close");
const navList = document.getElementById("lists")


async function navLists(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
    
        for (let list of data) {
            navList.innerHTML += `
            <li>
                <a class="nav-element" id="list-list" href="/list/${list.id}">
                    <img src=${imgSrc} alt="list icon" class="icon" id="list-icon">
                    <p class="nav-text">${list.title}</p>
                </a>
            </li>`
                ;
        }
    
    } catch(error) {
        console.log(error)
    }
}

navList.onload = navLists(listEndpoint)

btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
form.addEventListener('submit', async event => {
    event.preventDefault();
    const title = document.getElementById("Title").value;
    const description = document.getElementById("Description").value;
    try {
        const res = await fetch('http://127.0.0.1:8000/api/list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': title,
                'description': description,
            }),
        });
        const data = await res.json();
        
        if (!res.ok) {
                console.log("problem");
                return;
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
