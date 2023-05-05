var giveSession = JSON.parse(sessionStorage.getItem("items"));
/*TODO :)
document.getElementById("jii").addEventListener("click", () => {
    document.getElementById("finish-container").style.display = "flex";
});*/

function startCart() {
    itemList();
}

function itemList() {
    const itemList = document.getElementById("item-list");
    var items = giveSession;

    var itemm = document.createElement("div");
    itemm.setAttribute("id", "items");

    if (items == null || items.length == 0) {
        itemm.innerHTML = "SU CARRITO ESTÁ VACIO";
    } else {
        itemm = createItems(items, itemm);
    }

    itemList.appendChild(itemm);
}

function isEmpty(){
    const itemsContainer = document.getElementById("items");
    var items = itemsContainer.getElementsByTagName("div");

    if(items.length == 0){
        itemsContainer.innerHTML = "SU CARRITO ESTÁ VACIO";
    }
}

function createItems(items, itemsContainer) {
    var totalCost = 0;

    items.forEach(item => {
        const amountCost = item.item.cost * item.amount;
        const id = item.item.id;

        var itemContainer = document.createElement("div");
        itemContainer.setAttribute("id", id);

        var imageItem = document.createElement("img");
        imageItem.src = item.item.imageUrl;
        imageItem.classList.add("image-item");

        var itemName = document.createElement("div");
        itemName.innerHTML = item.item.name[0].toUpperCase() + item.item.name.slice(1);
        itemName.classList.add("name-item");

        var itemID = document.createElement("div");
        itemID.innerHTML = id;
        itemID.classList.add("id-item");

        var itemCost = document.createElement("div");
        itemCost.innerHTML = `${item.item.cost} €`;
        itemCost.classList.add("cost-item");

        var itemAmount = document.createElement("input");
        itemAmount.type = "number";
        itemAmount.min = 0;
        itemAmount.value = item.amount;
        itemAmount.classList.add("amount");
        itemAmount.addEventListener("keyup", () => changeAmount(id, itemAmount.innerHTML));

        var plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.classList.add("plus-button");
        plusButton.addEventListener("click", () => changeAmount(id, "plus"));

        var lessButton = document.createElement("button");
        lessButton.innerHTML = "-";
        lessButton.classList.add("less-button");
        lessButton.addEventListener("click", () => changeAmount(id, "less"));

        var totalItemCost = document.createElement("div");
        totalItemCost.innerHTML = `${amountCost} €`;
        totalItemCost.classList.add("total-item-cost");

        itemsContainer.appendChild(itemContainer);
        itemContainer.appendChild(imageItem);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemID);
        itemContainer.appendChild(itemCost);
        itemContainer.appendChild(itemAmount);
        itemContainer.appendChild(totalItemCost);

        itemContainer.appendChild(plusButton);
        itemContainer.appendChild(lessButton);

        totalCost += amountCost;
    });

    console.log(totalCost);

    return itemsContainer;
}

async function changeAmount(id, option){
    const itemId = document.getElementById(id);
    var amount = itemId.getElementsByClassName("amount")[0];
    var value = parseInt(amount.value);

    if(option == "plus"){
        amount.value = value + 1;
    }else{
        amount.value = value - 1;
        
        if(amount.value == 0){
            await setTimeout(() => {
                itemId.remove();
                isEmpty();
            }, 1000);
        }
    }

    
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