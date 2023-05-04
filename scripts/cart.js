var giveSession = JSON.parse(sessionStorage.getItem("items"));

function startCart() {
    itemList();
}

function itemList() {
    const itemList = document.getElementById("item-list");
    var items = giveSession;

    var itemm = document.createElement("div");

    if (items?.length == 0) {
        itemm.innerHTML = "SU CARRITO ESTÁ VACIO";
    } else {
        itemm = createItems(items, itemm);
    }

    itemList.appendChild(itemm);
}

function createItems(items, itemContainer) {
    var totalCost = 0;

    items.forEach(item => {
        var imageItem = document.createElement("img");
        imageItem.src = item.item.imageUrl;

        var itemID = document.createElement("div");
        itemID.innerHTML = item.item.id;

        var itemName = document.createElement("div");
        itemName.innerHTML = item.item.name[0].toUpperCase() + item.item.name.slice(1);

        var itemCost = document.createElement("div");
        itemCost.innerHTML = item.item.cost;

        totalCost += item.item.cost * item.amount;
        console.log(totalCost);
    });

    return itemContainer;
}

function buttonState(text) {
    var button = document.getElementById("submit");

    if (text.length != 0) {
        button.style.display = "inline";
    } else {
        button.style.display = "";
    }
}

function zeroFill(text) {
    text = text.toString();

    if (text.length == 1) {
        text = text.padStart(2, 0);
    }

    return text;
}

async function submit() {
    var name = document.getElementById("data").value;
    var items = giveSession;

    const time = new Date();
    const dateShop = `${zeroFill(time.getDay())}/${zeroFill(time.getMonth())}/${time.getFullYear()}`;
    const timeShop = `${time.getHours()}:${zeroFill(time.getMinutes())}:${zeroFill(time.getSeconds())}`;

    var data =
    {
        "users": [
            {
                "user": name,
                "items": [
                ],
                "date": dateShop,
                "time": timeShop
            }
        ]
    };

    for (var i = 0; i < items.length; i++) {
        data.users[0].items.push({
            "id": items[i].item.id,
            "name": items[i].item.name,
            "amount": items[i].amount
        });
    }

    await uploadData(JSON.stringify(data));
}

async function uploadData(data) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping", {
        method: "PUT",
        body: data,
        headers: {
            "Content-type": "application/json",
        }
    });
}