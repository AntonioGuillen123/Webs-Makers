const URL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping";

var arrayUsers = [];
var arrayItems = [];

function youAreAdmin() {
    var session = sessionStorage.getItem("firstTime");

    if (session != "true") {
        sessionStorage.setItem("firstTime", true);

        alert("Has entrado en modo admin\nAhora tienes privilegios");
    }

    getItems();
}

async function getItems() {
    var request = await fetch(URL);
    var data = await request.json();

    await arrayUsers.push(data.users);

    viewUsers();
}

function viewUsers() {

    //var div1 = document.getElementById("all");

    var users = document.getElementById("users");
    //var items = document.getElementById("items");

    for (var i = 0; i < arrayUsers.length; i++) {
        for (var j = 0; j < arrayUsers[i].length; j++) {
            var user = document.createElement("div");
            var userName = document.createElement("div");
            var userDate = document.createElement("div");
            

            userName.innerHTML = `Usuario: ${arrayUsers[i][j].user}`;
            userDate.innerHTML = `Fecha y hora: ${arrayUsers[i][j].date} - ${arrayUsers[i][j].time}`;

            arrayItems.push(arrayUsers[i][j].items);

            users.appendChild(user);
            user.appendChild(userName);
            user.appendChild(userDate);

            for (var k = 0; k < arrayItems.length; k++) {
                var items = document.createElement("div");
                for (var l = 0; l < arrayItems[k].length; l++) {
                    var item = document.createElement("div");
                    var itemAmount = document.createElement("div");
                    var itemId = document.createElement("div");
                    var itemName = document.createElement("div");
        
                    itemId.innerHTML = `ID: ${arrayItems[k][l].id}`;
                    itemName.innerHTML = `Nombre: ${arrayItems[k][l].name}`;
                    itemAmount.innerHTML = `Cantidad: ${arrayItems[k][l].amount}`;
        
                    item.appendChild(itemId);
                    item.appendChild(itemName);
                    item.appendChild(itemAmount);
                    items.appendChild(item);
                }
            }
            user.appendChild(items);
        }
    }

    console.log(arrayUsers);
    console.log(arrayItems);
}