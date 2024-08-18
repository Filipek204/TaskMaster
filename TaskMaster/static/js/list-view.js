const itemsEndpoint = 'http://127.0.0.1:8000/api/items'
const listsEndpoint = 'http://127.0.0.1:8000/api/list/'
const listUrl = new URL(window.location.href);
const listID = listUrl.pathname.split('/')[2]

let tasksContainer = document.getElementById("tasks-container");
let listsContainer = document.getElementById("lists-container");
let taskButtons = document.getElementById("task-buttons");
let listButtons = document.getElementById("list-buttons");
let listTitle = document.getElementById("list-title");

function listeningClick() {
    document.querySelectorAll('.tm-task-delete-link').forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent document click handler from firing
        let confirmBody = document.querySelectorAll('.confirmBody')[index];
        let confirmBodies = document.querySelectorAll('.confirmBody');
        confirmBodies.forEach((confBody) => {
            confBody.classList.remove('show');
        })
        confirmBody.classList.toggle('show');
        
        confirmBody.addEventListener('click', (event) => {
            let id = event.currentTarget.id;
            deleteTask(`${itemsEndpoint}${id}/delete/`);
        }, { once: true });
    });
});
    document.addEventListener('click', (event) => { 
        const confirmationDialogs = document.querySelectorAll('.confirmBody');
        confirmationDialogs.forEach((confirmBody , index) => {
            if (!confirmBody.contains(event.target)) {
                confirmBody.classList.remove('show');
            }
        })
                
    })
    
}
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
                if (res.status === 401) {
                    window.location.href = "/login/"
                    return;
                }
            return;
        }
        // const date = new Date(data.created_at)
        const data = await res.json()
        let taskContent = ''
        for(let list of data){
            taskContent +=
                `<tr>
                    
                        <td class="tm-product-name" onClick="goTo(${list.id})">${list.title}</td>
                        
                        <td class="text-center">
                                    <a href="#" class="tm-list-delete-link">
                                        <i class="far fa-trash-alt tm-product-delete-icon"></i>
                                    </a>
                                </td>
                            </tr>
                            `;
        }
        listsContainer.innerHTML = taskContent;
        
       listButtons.innerHTML=` <a href="/add-list/" class="btn btn-primary btn-block text-uppercase">Add new list</a>`
    } catch (error) {
        console.log(error)
    }

}
    async function listItems(url) {
        try {
            const res = await fetch(`${url}/${listID}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`
                },
            });
            
            if (!res.ok) {
                console.log("problem");
                if (res.status === 401) {
                    window.location.href = "/login/"
                    return;
                }
                return;
            }    
            const data = await res.json()
            let listContent=''
            for (let item of data) {
                 listContent += `
                <tr>
                    <!--<th scope="row"><input type="checkbox" /></th>-->
                    <td class="tm-product-name">status</td>
                    <td>${item.title}</td>
                    <td>category</td>
                    <td>${item.due_date}</td>
                    <td class="del-body">
                        <div class="tm-task-delete-link">
                            <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </div>
                        <div id="/${item.id}" class="confirmBody">
                            <h6 class="delete-text">Delete</h6>
                        </div>
                    </td>
                </tr>`;
            }
            tasksContainer.innerHTML = listContent
            taskButtons.innerHTML = `<a href="/add-item/${listID}" class="btn btn-primary btn-block text-uppercase">Add new task</a>`;
            listeningClick()
            
        } catch (error) {
            console.log(error)
        }
    }

    window.onload = listItems(itemsEndpoint)
    window.onload = lists(listsEndpoint)
    function goTo(id) {
        window.location.href = `../${id}`;
}

async function deleteTask(url) {
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`
                },
            });
            
            if (!res.ok) {
                console.log("problem", res.status);
                if (res.status === 401) {
                    window.location.href = "/login/"
                    return;
                }
                return;
            }
            
            listItems(itemsEndpoint)
        } catch (error) {
            console.log(error);
        }
 }
// function confirmDelete() {
//     window.querySelectorAll(".confirmBody").classList.toggle('.show');
// }
 
// console.log(deleteButtons)
// deleteButtons.forEach(( button, index ) => {
//     button.addEventListener('click', event => {
//             deleteTask(`${itemsEndpoint}${index}/delete/`)
//         })
// });

    

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
