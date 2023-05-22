const cartURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping";
const formURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/form";

var arrayCartUsers = [];
var arrayCartItems = [];
var arrayFormUsers = [];
var newArrayCartUsers = [];
var newArrayFormUsers = [];

async function youAreAdmin() {
    var session = sessionStorage.getItem("firstTime");

    if (session != "true") {
        alert("Has entrado en modo admin\nAhora tienes privilegios");

        sessionStorage.setItem("firstTime", true);
    }

    /* window.addEventListener("beforeunload", () => {
        var currentUrl = window.location.href;
        var splitUrl = currentUrl.split('/');

        if (splitUrl[4] != "admin.html") {
            sessionStorage.setItem("firstTime", true);
        }
    }); */

    await getItems();
    await getUsers();
}

async function getItems() {
    var request = await fetch(cartURL);
    var data = await request.json();
    var arrayContent = data.users;

    await arrayCartUsers.push(arrayContent);
    viewCartUsers();
}

async function getUsers() {
    var request = await fetch(formURL);
    var data = await request.json();
    var arrayContent = data.users;

    await arrayFormUsers.push(arrayContent);
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
        for (var j = 0; j < arrayFormUsers[i].length; j++) {
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

function deleteAllShop() {
    var users = document.getElementById("usersItems");

    //arrayCartItems = [];
    users.innerHTML = "";
}

function deleteAllMessages() {
    var users = document.getElementById("usersContact");

    //arrayFormItems = [];
    users.innerHTML = "";
}

function deleteUserShop() {
    var form = document.getElementById("delete-shop");
    var input = document.getElementById("user-id-shop");

    if (input.value == "") {
        alert("Debes introducir el ID de un Usuario");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value != "") {
            if (input.value < 1 || input.value > arrayCartUsers[0].length) {
                alert("El ID introducido no es válido");
            }
            else {
                for (var i = 0; i < arrayCartUsers[0].length; i++) {
                    if (input.value != arrayCartUsers[0][i].id && !newArrayCartUsers.includes(arrayCartUsers[0][i])) {
                        newArrayCartUsers.push(arrayCartUsers[0][i]);
                    }
                }
            }

            input.value = "";
        }

        for (var i = 0; i < newArrayCartUsers.length; i++) {
            if (i + 1 != newArrayCartUsers[i].id) {
                newArrayCartUsers[i].id = i + 1;
            }
        }
    })

    console.log(newArrayCartUsers);
}

function deleteUserMessage() {
    var form = document.getElementById("delete-message");
    var input = document.getElementById("user-id-message");

    if (input.value == "") {
        alert("Debes introducir el ID de un Usuario");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value != "") {
            if (input.value < 1 || input.value > arrayCartUsers[0].length) {
                alert("El ID introducido no es válido");
            }
            else {
                for (var i = 0; i < arrayFormUsers[0].length; i++) {
                    if (input.value != arrayFormUsers[0][i].id && !newArrayFormUsers.includes(arrayFormUsers[0][i])) {
                        newArrayFormUsers.push(arrayFormUsers[0][i]);
                    }
                }
            }

            for (var i = 0; i < newArrayFormUsers.length; i++) {
                if (i + 1 != newArrayFormUsers[i].id) {
                    newArrayFormUsers[i].id = i + 1;
                }
            }

            input.value = "";
        }
    })

    console.log(newArrayFormUsers);
}