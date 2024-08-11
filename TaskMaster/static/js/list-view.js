const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
const listsEndpoint = 'http://127.0.0.1:8000/api/list/'
const listUrl = new URL(window.location.href);
const listID = listUrl.pathname.split('/')[2]

let tasksContainer = document.getElementById("tasks-container");
let listsContainer = document.getElementById("lists-container");
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
        const data = await res.json()
        const date = new Date(data.created_at)
        for(let list of data){
            listsContainer.innerHTML +=
                `<tr>
                                <td class="tm-product-name">${list.title}</td>
                                <td class="text-center">
                                    <a href="#" class="tm-product-delete-link">
                                        <i class="far fa-trash-alt tm-product-delete-icon"></i>
                                    </a>
                                </td>
                            </tr>`;
        }
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
        } catch (error) {
            console.log(error)
        }
    }

    window.onload = listItems(itemsEndpoint)
    window.onload = lists(listsEndpoint)


    // btn.onclick = function () {
    //     modalItem.style.display = "block";
    // }
    // closeItemForm.onclick = function () {
    //     modalItem.style.display = "none";
    // }
    // formItem.addEventListener('submit', async event => {
    //     event.preventDefault();
    //     try {
    //         const res = await fetch(itemsEndpoint, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
    //             },
    //             body: JSON.stringify({
    //                 'title': event.target.title.value,
    //                 'description': event.target.description.value,
    //                 'due_date': event.target.dueDate.value,
    //                 'done': false,
    //                 'list': listID,
    //             }),
    //         });
    //         const data = await res.json();
        
    //         if (!res.ok) {
    //             console.log("problem");
    //             return;
    //         }
        
        
    //         modalItem.style.display = "none";
    //         listView.innerHTML += `
    //       <li class="list-element">
    //         <div class="list-element-text">
            
    //         <div class="container">
    //         <h3 class="item-view">${data.title}</h3>
    //         <label>
    //             <input type="checkbox">
    //             <span class="checkmark"></span></label>
    //         </div>
    //         </div>
            
    //     </li>`;
    //         // elements = document.querySelectorAll('.item-view');
    //         // elements.forEach(( element, index ) => {
    //         //     element.addEventListener('click', event => {
    //         //         viewItemModal.style.display = "block";
    //         //         listViewTitle.innerHTML = filteredData[index].title
    //         //         itemViewListTitle.innerHTML = listTitleData
    //         //         delItem.addEventListener('click', () => {
    //         //             deleteItem(`${itemsEndpoint}${filteredData[index].id}/delete/`)
    //         //             viewItemModal.style.display = "none";
    //         //         })
    //         //     });
    //         // });
    //         // listView.innerHTML =""
    //         // listItems(itemsEndpoint)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
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
