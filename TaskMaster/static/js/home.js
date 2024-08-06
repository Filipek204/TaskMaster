// const itemsEndpoint = 'http://127.0.0.1:8000/api/items/'
// const upcomingTasks = document.getElementById("upcoming-task-list");
userName = document.getElementById("user-name");
async function profileInfo(url) {
    try {
        const res = await fetch(`${url}profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access')}`
           },
        });
        const data = await res.json();
        if (!res.ok) {
                console.log("problem");
                return;
        }
        console.log(data)
        userName.innerHTML=data.username
    } catch(error) {
        console.log(error)
    }
}
window.onload= profileInfo(Endpoint)
// var i = 1;
// async function items(url) {
//     try {
//         const res = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${window.localStorage.getItem('access')}`
//             },
//         });
//         const data = await res.json();

//         data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
//         if (data.length < 5) {
//             itemsToDisplay = data.length
//         } else {
//             itemsToDisplay = 5
//         }
//         for (var i = 0; i < itemsToDisplay; i++) {
//             upcomingTasks.innerHTML += `
//             <li class="upcoming-element">
        
//             <div class="upcoming-element-text">
//                 <div style="float: left;">0${i + 1}.&nbsp</div><div>${data[i].title}</div>  
//             </div>
//             <label class="container">
//                 <input type="checkbox">
//                 <span class="checkmark"></span>
//             </label>
//     </li>`
//         };
    
//     } catch (error) {
//         console.log(error)
//     }
// }
// window.onload= items(itemsEndpoint)