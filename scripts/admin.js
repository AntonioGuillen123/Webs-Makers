const cartURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping";
const formURL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/form";

var arrayCartUsers = [];
var arrayCartItems = [];
var arrayFormUsers = [];

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

    await arrayCartUsers.push(data);
    viewCartUsers();
}

async function getUsers() {
    var request = await fetch(formURL);
    var data = await request.json();

    await arrayFormUsers.push(data);
    viewFormUsers();
}

function viewCartUsers() {
    var users = document.getElementById("usersItems");

    if (arrayCartUsers[0].users != undefined) {
        for (var i = 0; i < arrayCartUsers[0].users.length; i++) {
            arrayCartUsers[0].users[i].id = i + 1;

            var user = document.createElement("div");
            var userName = document.createElement("div");
            var userDate = document.createElement("div");
            var userId = document.createElement("div");

            userId.innerHTML = `ID de Usuario: ${arrayCartUsers[0].users[i].id}`;
            userName.innerHTML = `Usuario: ${arrayCartUsers[0].users[i].user}`;
            userDate.innerHTML = `Fecha y hora: ${arrayCartUsers[0].users[i].date} - ${arrayCartUsers[0].users[i].time}`;

            arrayCartItems.push(arrayCartUsers[0].users[i].items);

            users.appendChild(user);
            user.appendChild(userId);
            user.appendChild(userName);
            user.appendChild(userDate);

            for (var j = 0; j < arrayCartItems.length; j++) {
                var items = document.createElement("div");
                for (var k = 0; k < arrayCartItems[j].length; k++) {
                    var item = document.createElement("div");
                    var itemAmount = document.createElement("div");
                    var itemId = document.createElement("div");
                    var itemName = document.createElement("div");

                    itemId.innerHTML = `ID: ${arrayCartItems[j][k].id}`;
                    itemName.innerHTML = `Nombre: ${arrayCartItems[j][k].name}`;
                    itemAmount.innerHTML = `Cantidad: ${arrayCartItems[j][k].amount}`;

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

    if (arrayFormUsers[0].users != undefined) {
        for (var i = 0; i < arrayFormUsers[0].users.length; i++) {
            arrayFormUsers[0].users[i].id = i + 1;

            var user = document.createElement("div");
            var userEmail = document.createElement("div");
            var userAffair = document.createElement("div");
            var userMessage = document.createElement("div");
            var userDateTime = document.createElement("div");
            var userId = document.createElement("div");

            userId.innerHTML = `ID de Usuario: ${arrayFormUsers[0].users[i].id}`;
            userEmail.innerHTML = `Email: ${arrayFormUsers[0].users[i].email}`;
            userAffair.innerHTML = `Asunto: ${arrayFormUsers[0].users[i].affair}`
            userMessage.innerHTML = `Mensaje: ${arrayFormUsers[0].users[i].message}`;
            userDateTime.innerHTML = `Fecha y Hora: ${arrayFormUsers[0].users[i].date} - ${arrayFormUsers[0].users[i].time}`;

            users.appendChild(user);
            user.appendChild(userId);
            user.appendChild(userEmail);
            user.appendChild(userAffair);
            user.appendChild(userMessage);
            user.appendChild(userDateTime);
        }
    }
}

function deleteAllShops() {
    var users = document.getElementById("usersItems");
    var upload = "";

    awaitUploadUserShop(upload);

    users.innerHTML = "";
}

function deleteAllMessages() {
    var users = document.getElementById("usersContact");
    var upload = "";

    awaitUploadUserMessage(upload);

    users.innerHTML = "";
}

async function deleteUserShop() {
    var form = document.getElementById("delete-shop");
    var input = document.getElementById("user-id-shop");
    var upload = "";
    var users = document.getElementById("usersItems");

    if (input.value == "") {
        alert("Debes introducir el ID de un Usuario");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value != "") {
            if (input.value < 1 || input.value > arrayCartUsers[0].users.length) {
                alert("El ID introducido no es válido");
            }
            else {
                for (var i = 0; i < arrayCartUsers[0].users.length; i++) {
                    if (input.value == arrayCartUsers[0].users[i].id) {
                        arrayCartUsers[0].users.splice(i, 1);
                    }
                }
                for (var i = 0; i < arrayCartUsers[0].users.length; i++) {
                    if (i + 1 != arrayCartUsers[0].users[i].id) {
                        arrayCartUsers[0].users[i].id = i + 1;
                    }
                }
            }

            input.value = "";
        }

        upload = JSON.stringify(arrayCartUsers[0]);

        awaitUploadUserShop(upload);

        users.innerHTML = "";

        viewCartUsers();
    })
}

async function deleteUserMessage() {
    var form = document.getElementById("delete-message");
    var input = document.getElementById("user-id-message");
    var upload = "";
    var users = document.getElementById("usersContact");

    if (input.value == "") {
        alert("Debes introducir el ID de un Usuario");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value != "") {
            if (input.value < 1 || input.value > arrayFormUsers[0].users.length) {
                alert("El ID introducido no es válido");
            }
            else {
                for (var i = 0; i < arrayFormUsers[0].users.length; i++) {
                    if (input.value == arrayFormUsers[0].users[i].id) {
                        arrayFormUsers[0].users.splice(i, 1);
                    }
                }
                for (var i = 0; i < arrayFormUsers[0].users.length; i++) {
                    if (i + 1 != arrayFormUsers[0].users[i].id) {
                        arrayFormUsers[0].users[i].id = i + 1;
                    }
                }
            }

            input.value = "";
        }

        upload = JSON.stringify(arrayFormUsers[0]);

        awaitUploadUserMessage(upload);

        users.innerHTML = "";

        viewFormUsers();
    })
}

async function uploadUserShop(data) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping", {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json"
        }
    });
}

async function uploadUserMessage(data) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/form", {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json"
        }
    });
}

async function awaitUploadUserShop(upload) {
    await uploadUserShop(upload);
}

async function awaitUploadUserMessage(upload) {
    await uploadUserMessage(upload);
}