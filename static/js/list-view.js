const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
var listUrl = new URL(window.location.href);
var listID = listUrl.pathname.split('/')[2]
btn = document.getElementById("add-item");
modalItem = document.getElementById("popup-add-item-container");
viewItemModal =document.getElementById("popup-view-item-container");
formItem = document.getElementById("form-item");
closeItemForm = document.getElementById("close");
closeViewItemForm = document.getElementById("close-view-iem");
listTitle = document.getElementById("list-title");
listDescription = document.getElementById("list-description");
listCreatedAt = document.getElementById("date");
itemViewBtn = document.getElementsByClassName("item-view")[2];
const listView = document.getElementById("list-view");     
async function list(url) {
    try {
        const res = await fetch(`${url}${listID}/`)
        const data = await res.json()
        const date = new Date(data.created_at)
        listTitle.innerHTML = `${data.title}`;
        listDescription.innerHTML = `${data.description}`;
        listCreatedAt.innerHTML = `${date.toLocaleString()}`;
        
        
    
    } catch(error) {
        console.log(error)
    }
}

listView.onload = list(listEndpoint)
async function listItems(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        const filteredData = data.filter(item => item.list==listID)
        for (let item of filteredData) {
                listView.innerHTML += `
                <li class="list-element">
            <div class="list-element-text">
            
            <div class="container">
            <h3 class="item-view">${item.title}</h3>
            <label>
                <input type="checkbox">
                <span class="checkmark"></span></label>
            </div>
            </div>
            
        </li>`;
            
            
        }
    
    } catch(error) {
        console.log(error)
    }
}

listView.onload = listItems(itemsEndpoint)


btn.onclick = function () {
    modalItem.style.display = "block";
}
closeItemForm.onclick = function () {
    modalItem.style.display = "none";
}
formItem.addEventListener('submit', async event => {
    event.preventDefault();
    const title = document.getElementById("item-title").value;
    const description = document.getElementById("item-description").value;
    const dueDate = document.getElementById("Due-date").value;
    try {
        const res = await fetch(itemsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': title,
                'description': description,
                'due_date': dueDate,
                'done': false,
                'list': listID,
            }),
        });
        const data = await res.json();
        
        if (!res.ok) {
                console.log("problem");
                return;
            }
        
        
        modalItem.style.display = "none";
        listView.innerHTML += `
           <li class="list-element">
            <div class="list-element-text">
            <label class="container"><h3 >${data.title}</h3>
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>

            </div>
        </li>
                `;
    } catch (error) {
        console.log(error);
    }
})



itemViewBtn.onclick = function () {
    viewItemModal.style.display = "block";
}
closeViewItemForm.onclick = function () {
    viewItemModal.style.display = "none";
}