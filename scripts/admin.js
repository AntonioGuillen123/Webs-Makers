const URL = "https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping";

var arrayUsers = [];

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

    await arrayUsers.push(data);

    console.log(arrayUsers);

    viewUsers();
}

function viewUsers()
{

    var div1 = document.getElementById("users");

    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var items = document.createElement("div");

    var itemAmount = document.createElement("div");
    var itemId = document.createElement("div");
    var itemName = document.createElement("div");

    div1.innerHTML = `Usuario: ${arrayUsers[0].users[0].user}`;
    div2.innerHTML = `Fecha y hora: ${arrayUsers[0].users[0].date} - ${arrayUsers[0].users[0].time}`;

    for(var i = 0; i < arrayUsers.length; i++){
        var div4 = document.createElement("div");
        itemId.innerHTML = `ID: ${arrayUsers[i].users[i].items[i].id}`;
        itemName.innerHTML = `Nombre: ${arrayUsers[i].users[i].items[i].name}`;
        itemAmount.innerHTML = `Cantidad: ${arrayUsers[i].users[i].items[i].amount}`;
        div4.appendChild(itemId);
        div4.appendChild(itemName);
        div4.appendChild(itemAmount);
        
        div1.appendChild(div2);
        div1.appendChild(div4);
    }

    
}