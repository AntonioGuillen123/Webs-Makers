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
    var items = document.getElementById("items");

    var userName = document.createElement("div");
    var userDate = document.createElement("div");

    var item = document.createElement("div");
    /* var itemAmount = document.createElement("div");
    var itemId = document.createElement("div");
    var itemName = document.createElement("div"); */

    userName.innerHTML = `Usuario: ${arrayUsers[0][0].user}`;
    userDate.innerHTML = `Fecha y hora: ${arrayUsers[0][0].date} - ${arrayUsers[0][0].time}`;

    for (var i = 0; i < arrayUsers.length; i++) {
        for (var j = 0; j < arrayUsers[i].length; j++) {
            arrayItems.push(arrayUsers[i][j].items);
        }
    }

    for (var i = 0; i < arrayItems.length; i++) {
        for (var j = 0; j < arrayItems[i].length; j++) {
            var itemAmount = document.createElement("div");
            var itemId = document.createElement("div");
            var itemName = document.createElement("div");

            itemId.innerHTML = `ID: ${arrayItems[i][j].id}`;
            itemName.innerHTML = `Nombre: ${arrayItems[i][j].name}`;
            itemAmount.innerHTML = `Cantidad: ${arrayItems[i][j].amount}`;

            item.appendChild(itemId);
            item.appendChild(itemName);
            item.appendChild(itemAmount);
        }
        items.appendChild(item);
    }

    users.appendChild(userName);
    users.appendChild(userDate);

    console.log(arrayItems);
}