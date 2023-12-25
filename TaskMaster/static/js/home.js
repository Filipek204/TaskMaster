const itemsEndpoint = async () => (await fetch('http://127.0.0.1:8000/api/items/')).json();
const upcomingTasks = document.getElementById("upcoming-task-list");
var i = 1;
itemsEndpoint()
    .then(data => {

        function sort_object_of_objects(data, attr) {
            var arr = [];
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    var obj = {};
                    obj[prop] = data[prop];
                    obj.tempSortName = data[prop][attr].toLowerCase();
                    arr.push(obj);
                }
            }

            arr.sort(function(a, b) {
                var at = a.tempSortName,
                    bt = b.tempSortName;
                return at > bt ? 1 : ( at < bt ? -1 : 0 );
            });

            var result = [];
            for (var i=0, l=arr.length; i<l; i++) {
                var obj = arr[i];
                delete obj.tempSortName;
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        var id = prop;
                    }
                }
                var item = obj[id];
                result.push(item);
            }
            return result;
        }

        object = sort_object_of_objects(data, 'due_date');
        for (var i=0; i<5; i++) {
            upcomingTasks.innerHTML += `
            <li class="upcoming-element">
        
            <div class="upcoming-element-text">
                <div style="float: left;">0${i+1}.&nbsp</div><div>${object[i].title}</div>  
            </div>
            <label class="container">
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
    </li>`
        };
    })

