const listEndpoint = 'http://127.0.0.1:8000/api/list/'
let formAddList = document.getElementById("form-add-list");
formAddList.addEventListener('submit', async event => {
        event.preventDefault();
        try {
            const res = await fetch(`${listEndpoint}create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access')}`
                },
                body: JSON.stringify({
                    'title': event.target.name.value,
                    'description': event.target.description.value
                })
            });
            
            if (!res.ok) {
                console.log("problem", res.status);
                if (res.status === 401) {
                    window.location.href = "/login/"
                    return;
                }
                return;
            }
            const data = await res.json();
            console.log(data)
            window.location.href=`/list/${data.id}`
            
        } catch (error) {
            console.log(error);
        }
})
