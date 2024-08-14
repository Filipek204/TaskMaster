const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
const listUrl = new URL(window.location.href);
const listID = listUrl.pathname.split('/')[2]
let formAddItem = document.getElementById("form-add-item");
formAddItem.addEventListener('submit', async event => {
        event.preventDefault();
        try {
            const res = await fetch(`${itemsEndpoint}create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`
                },
                body: JSON.stringify({
                    'title': event.target.name.value,
                    'description': event.target.description.value,
                    'done': false,
                    'due_date': event.target.due_date.value,
                    'list': listID
                })
            });
            
            if (!res.ok) {
                console.log("problem", res.status);
                return;
            }
            const data = await res.json();
            window.location.href=`/list/${listID}`
            
        } catch (error) {
            console.log(error);
        }
})
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
            // listView.innerHTML =""
            // listItems(itemsEndpoint)