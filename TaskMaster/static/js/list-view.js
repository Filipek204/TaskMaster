const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
const listUrl = new URL(window.location.href);
const listID = listUrl.pathname.split('/')[2]
let btn = document.getElementById("add-item");
let modalItem = document.getElementById("popup-add-item-container");
let viewItemModal =document.getElementById("popup-view-item-container");
let formItem = document.getElementById("form-item");
let closeItemForm = document.getElementById("close-item-form");
let closeViewItemForm = document.getElementById("close-view-item");
let listTitle = document.getElementById("list-title");
let listDescription = document.getElementById("list-description");
let listCreatedAt = document.getElementById("date");
let listView = document.getElementById("list-view");    
let elements = {};
let listTitleData = ""
const listViewTitle = document.getElementById("item-view-title");
let itemViewListTitle = document.getElementById("item-view-list-title");
const delItem = document.getElementById("delete-item");
let filteredData = [ ]

async function list(url) {
    try {
        const res = await fetch(`${url}${listID}/`)
        const data = await res.json()
        const date = new Date(data.created_at)
        listTitleData = data.title
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
        filteredData = data.filter(item => item.list==listID)
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
    elements = document.querySelectorAll('.item-view');
        elements.forEach(( element,index )   => {
            element.addEventListener('click', event => {
                viewItemModal.style.display = "block";
                listViewTitle.innerHTML = filteredData[index].title
                itemViewListTitle.innerHTML = listTitleData
                delItem.addEventListener('click', () => {
                    deleteItem(`${itemsEndpoint}${filteredData[index].id}/delete/`)
                    viewItemModal.style.display = "none";
                })
            });
        });

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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  window.localStorage.getItem("token"),
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
        // listView.innerHTML += `
        //   <li class="list-element">
        //     <div class="list-element-text">
            
        //     <div class="container">
        //     <h3 class="item-view">${data.title}</h3>
        //     <label>
        //         <input type="checkbox">
        //         <span class="checkmark"></span></label>
        //     </div>
        //     </div>
            
        // </li>`;
        // elements = document.querySelectorAll('.item-view');
        // elements.forEach(( element, index ) => {
        //     element.addEventListener('click', event => {
        //         viewItemModal.style.display = "block";
        //         listViewTitle.innerHTML = filteredData[index].title
        //         itemViewListTitle.innerHTML = listTitleData
        //         delItem.addEventListener('click', () => {
        //             deleteItem(`${itemsEndpoint}${filteredData[index].id}/delete/`)
        //             viewItemModal.style.display = "none";
        //         })
        //     });
        // });
        listView.innerHTML =""
        listItems(itemsEndpoint)
    } catch (error) {
        console.log(error);
    }
})
closeViewItemForm.onclick = function () {
    viewItemModal.style.display = "none";
}
async function deleteItem(url) {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
        });
        if (!res.ok) {
                console.log("problem");
                return;
        }
        listView.innerHTML =""
        listItems(itemsEndpoint)
    } catch (error) {
        console.log(error);
    }
}