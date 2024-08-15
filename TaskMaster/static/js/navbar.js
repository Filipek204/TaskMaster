const Endpoint = 'http://127.0.0.1:8000/api/'

async function logout() {
    try {
        const res = await fetch(`${Endpoint}logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access')}`
            },
            body: JSON.stringify({ 'refresh': window.localStorage.getItem('refresh') })
        });

        if (!res.ok) {
            console.log(res.status);
            return; // Return null or handle error as needed
        }
        // Save new tokens to localStorage
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
    } catch (error) {
        console.log(error);
    }
}



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


async function refreshToken() {
    try {
        const res = await fetch(`${Endpoint}token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access')}`
            },
            body: JSON.stringify({ 'refresh': window.localStorage.getItem('refresh') })
        });

        if (!res.ok) {
            console.log(res.status);
            return; // Return null or handle error as needed
        }

        const data = await res.json();

        // Save new tokens to localStorage
        window.localStorage.setItem('access', data.access);
        window.localStorage.setItem('refresh', data.refresh);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

function setupTokenRefresh() {
    const refreshInterval = 14 * 60 * 1000; // 14 minutes

    setInterval(async () => {
        await refreshToken();
    }, refreshInterval);
}

// Call this function when your app initializes
window.onload = setupTokenRefresh();
