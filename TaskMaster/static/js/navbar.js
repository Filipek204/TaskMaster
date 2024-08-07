const Endpoint = 'http://127.0.0.1:8000/api/'
btn = document.getElementById("create-list");
modal = document.getElementById("popup-add-list-container");
form = document.getElementById("form");
closeListForm = document.getElementById("close");
const navList = document.getElementById("lists");





// async function navLists(url) {
//     try {
//        const res = await fetch(`${url}list/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${window.localStorage.getItem('access')}`
//            },
//         });
//         const data = await res.json()
//         for (let list of data) {
//             navList.innerHTML += `
//                 <a class="nav-element" id="list-list" href="/list/${list.id}">
//                     <img src=${imgSrc} alt="list icon" class="icon" id="list-icon">
//                     <p class="nav-text">${list.title}</p>
//                 </a>`
//                 ;
//         }

//     } catch(error) {
//         console.log(error)
//     }
// }
// window.onload= profileInfo(Endpoint)
// window.onload= navLists(Endpoint)
// btn.onclick = function () {
//     modal.style.display = "block";
// }
// closeListForm.onclick = function () {
//     modal.style.display = "none";
// }
// form.addEventListener('submit', async event => {
//     event.preventDefault();
//     try {
//         const res = await fetch(listEndpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${window.localStorage.getItem('access')}`,
//             },
//             body: JSON.stringify({
//                 'title': event.target.Title.value,
//                 'description': event.target.Description.value,
//             }),
//         });
//         const data = await res.json();
        
//         if (!res.ok) {
//                 console.log("problem");
//                 return;
//         }
//         console.log(data);
//         modal.style.display = "none";
//         navList.innerHTML += `
//             <li>
//                 <a class="nav-element" id="list-list" href="/list/${data.id}">
//                     <img src=${imgSrc} alt="list icon" class="icon" id="list-icon">
//                     <p class="nav-text">${data.title}</p>
//                 </a>
//             </li>`
//                 ;
//     } catch (error) {
//         console.log(error);
//     }
// })


async function refreshToken(url){
try {
    const res = await fetch(`${url}token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access')}`
        },
            body: {'refresh': window.localStorage.getItem('refresh')}},
    );
    const data = await res.json()
    if (!res.ok) {
        console.log("problem")
    }
    window.localStorage.setItem("access", data.access);
    window.localStorage.setItem("refresh", data.refresh);
} catch(error) {
    console.log(error)
    }
}
function setupTokenRefresh(url) {
    setInterval(async () => {
        try {
            const data = await refreshToken(url);
            console.log('New Access Token:', data.access);
            // Save the new access token for further use
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }, 14 * 60 * 1000); // Refresh every 14 minutes
}

    window.onload=setupTokenRefresh(Endpoint)