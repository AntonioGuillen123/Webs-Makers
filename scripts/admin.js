const cartURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping";
const formURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/form";

var arrayCartUsers = [];
var arrayCartItems = [];
var arrayFormUsers = [];

async function youAreAdmin() {
    var session = sessionStorage.getItem("firstTime");

    if (session != "true") {
        sessionStorage.setItem("firstTime", true);

        alert("Has entrado en modo admin\nAhora tienes privilegios");
    }

    await getItems();
    await getUsers();
}

async function getItems() {
    var request = await fetch(cartURL);
    var data = await request.json();

    await arrayCartUsers.push(data.users);

    viewCartUsers();
}

async function getUsers() {
    var request = await fetch(formURL);
    var data = await request.json();

    await arrayFormUsers.push(data.users);

    viewFormUsers();
}

function viewCartUsers() {
    var users = document.getElementById("usersItems");

    for (var i = 0; i < arrayCartUsers.length; i++) {
        for (var j = 0; j < arrayCartUsers[i].length; j++) {
            arrayCartUsers[i][j].id = j + 1;

            var user = document.createElement("div");
            var userName = document.createElement("div");
            var userDate = document.createElement("div");
            var userId = document.createElement("div");

            userId.innerHTML = `ID de Usuario: ${arrayCartUsers[i][j].id}`;
            userName.innerHTML = `Usuario: ${arrayCartUsers[i][j].user}`;
            userDate.innerHTML = `Fecha y hora: ${arrayCartUsers[i][j].date} - ${arrayCartUsers[i][j].time}`;

            arrayCartItems.push(arrayCartUsers[i][j].items);

            users.appendChild(user);
            user.appendChild(userId);
            user.appendChild(userName);
            user.appendChild(userDate);

            for (var k = 0; k < arrayCartItems.length; k++) {
                var items = document.createElement("div");
                for (var l = 0; l < arrayCartItems[k].length; l++) {
                    var item = document.createElement("div");
                    var itemAmount = document.createElement("div");
                    var itemId = document.createElement("div");
                    var itemName = document.createElement("div");

                    itemId.innerHTML = `ID: ${arrayCartItems[k][l].id}`;
                    itemName.innerHTML = `Nombre: ${arrayCartItems[k][l].name}`;
                    itemAmount.innerHTML = `Cantidad: ${arrayCartItems[k][l].amount}`;

                    item.appendChild(itemId);
                    item.appendChild(itemName);
                    item.appendChild(itemAmount);
                    items.appendChild(item);
                }
            }
            user.appendChild(items);
        }
    }
}

function viewFormUsers() {
    var users = document.getElementById("usersContact");

    for (var i = 0; i < arrayFormUsers.length; i++) {
        for(var j = 0; j < arrayFormUsers[i].length; j++){
            arrayFormUsers[i][j].id = j + 1;

            var user = document.createElement("div");
            var userEmail = document.createElement("div");
            var userAffair = document.createElement("div");
            var userMessage = document.createElement("div");
            var userDateTime = document.createElement("div");
            var userId = document.createElement("div");

            userId.innerHTML = `ID de Usuario: ${arrayFormUsers[i][j].id}`;
            userEmail.innerHTML = `Email: ${arrayFormUsers[i][j].email}`;
            userAffair.innerHTML = `Asunto: ${arrayFormUsers[i][j].affair}`
            userMessage.innerHTML = `Mensaje: ${arrayFormUsers[i][j].message}`;
            userDateTime.innerHTML = `Fecha y Hora: ${arrayFormUsers[i][j].date} - ${arrayFormUsers[i][j].time}`;

            users.appendChild(user);
            user.appendChild(userId);
            user.appendChild(userEmail);
            user.appendChild(userAffair);
            user.appendChild(userMessage);
            user.appendChild(userDateTime);
        }
    }
}