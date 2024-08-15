const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
const listsEndpoint = 'http://127.0.0.1:8000/api/list/'
const listUrl = new URL(window.location.href);
const listID = listUrl.pathname.split('/')[2]

let tasksContainer = document.getElementById("tasks-container");
let listsContainer = document.getElementById("lists-container");
let taskButtons = document.getElementById("task-buttons");
let listButtons = document.getElementById("list-buttons");
let listTitle = document.getElementById("list-title");

async function lists(url) {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access')}`
            },
        });
        if (!res.ok) {
                console.log("problem");
                return;
        }
        // const date = new Date(data.created_at)
        const data = await res.json()
        let content = ''
        for(let list of data){
            content +=
                `<tr>
                    
                        <td class="tm-product-name" onClick="goTo(${list.id})">${list.title}</td>
                        
                        <td class="text-center">
                                    <a href="#" class="tm-product-delete-link">
                                        <i class="far fa-trash-alt tm-product-delete-icon"></i>
                                    </a>
                                </td>
                            </tr>
                            `;
        }
        listsContainer.innerHTML = content;
        
       listButtons.innerHTML=` <a href="/add-list/" class="btn btn-primary btn-block text-uppercase mb-3">Add new list</a>`
    } catch (error) {
        console.log(error)
    }

}
    async function listItems(url) {
        try {
            const res = await fetch(`${url}${listID}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`
                },
            });
            
            if (!res.ok) {
                console.log("problem");
                return;
            }    
            const data = await res.json()
            
            for (let item of data) {
                tasksContainer.innerHTML += `
                <tr>
                    <!--<th scope="row"><input type="checkbox" /></th>-->
                    <td class="tm-product-name">status</td>
                    <td>${item.title}</td>
                    <td>category</td>
                    <td>${item.due_date}</td>
                    <td>
                        <a href="#" class="tm-product-delete-link">
                            <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                    </td>
                </tr>`;
            }
            taskButtons.innerHTML = `<a href="/add-item/${listID}" class="btn btn-primary btn-block text-uppercase mb-3">Add new task</a>
                    `;
            
        } catch (error) {
            console.log(error)
        }
    }

    window.onload = listItems(itemsEndpoint)
    window.onload = lists(listsEndpoint)
    function goTo(id) {
        window.location.href = `../${id}`;
    }


    
    // closeViewItemForm.onclick = function () {
    //     viewItemModal.style.display = "none";
    // }
    // async function deleteItem(url) {
    //     try {
    //         const res = await fetch(url, {
    //             method: 'DELETE',
    //         });
    //         if (!res.ok) {
    //             console.log("problem");
    //             return;
    //         }
    //         listView.innerHTML = ""
    //         listItems(itemsEndpoint)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
