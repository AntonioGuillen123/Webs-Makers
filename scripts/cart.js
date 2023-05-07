var giveSession = JSON.parse(sessionStorage.getItem("items"));
var totalCost;
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

    var itemm = document.createElement("tbody");
    itemm.setAttribute("id", "items");

    if (items == null || items.length == 0) {
        itemm.innerHTML = "SU CARRITO ESTÁ VACIO";
    } else {
        itemm = createItems(items, itemm);
    }

    itemList.appendChild(itemm);
}

function isEmpty() {
    const itemsContainer = document.getElementById("items");
    var items = itemsContainer.getElementsByTagName("tr");

    if (items.length == 0) {
        itemsContainer.innerHTML = "SU CARRITO ESTÁ VACIO";
    }
}

function createItems(items, itemsContainer) {
    items.forEach(item => {
        const amountCost = (item.item.cost * parseInt(item.amount)).toFixed(2);
        const id = item.item.id;

        var itemContainer = document.createElement("tr");
        itemContainer.setAttribute("id", id);

        var imageContainer = document.createElement("td");
        imageContainer.classList.add("image-container");

        var imageItem = document.createElement("img");
        imageItem.src = item.item.imageUrl;
        imageItem.classList.add("image-item");

        var itemName = document.createElement("td");
        itemName.innerHTML = item.item.name[0].toUpperCase() + item.item.name.slice(1);
        itemName.classList.add("name-item");

        var itemID = document.createElement("td");
        itemID.innerHTML = id;
        itemID.classList.add("id-item");

        var amountContainer = document.createElement("td");
        amountContainer.classList.add("count-container");

        var itemAmount = document.createElement("input");
        itemAmount.type = "number";
        itemAmount.min = 0;
        itemAmount.value = item.amount;
        itemAmount.classList.add("amount");
        itemAmount.addEventListener("input", () => changeAmount(id, itemAmount.value));

        var plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.classList.add("btn-count");
        plusButton.classList.add("plus-button");
        plusButton.addEventListener("click", () => changeAmount(id, "plus"));

        var lessButton = document.createElement("button");
        lessButton.innerHTML = "-";
        lessButton.classList.add("btn-count");
        lessButton.classList.add("less-button");
        lessButton.addEventListener("click", () => changeAmount(id, "less"));

        var itemCost = document.createElement("td");
        itemCost.innerHTML = `${item.item.cost} €`;
        itemCost.classList.add("cost-item");

        var totalItemCost = document.createElement("td");
        totalItemCost.innerHTML = `${amountCost} €`;
        totalItemCost.classList.add("total-cost-item");

        itemsContainer.appendChild(itemContainer);
        itemContainer.appendChild(imageContainer);
        imageContainer.appendChild(imageItem);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemID);

        itemContainer.appendChild(amountContainer);
        amountContainer.appendChild(lessButton);
        amountContainer.appendChild(itemAmount);
        amountContainer.appendChild(plusButton);
        
        itemContainer.appendChild(itemCost);
        itemContainer.appendChild(totalItemCost);
    });

    return itemsContainer;
}

function changeCost(id) {
/*TODO
    Aqui tengo que bindear el actualizar la cantidad con el actualizar el precio total, cuando haya un elemento en el DOM se hará :))))))
 */
    var amountCost = 0;

    var allAmountCost = document.getElementsByClassName("total-cost-item");
    
    for(var i = 0; i < allAmountCost.length; i++){
        amountCost += parseFloat(allAmountCost[i].innerHTML.split(" ")[0]).toFixed(2);
    }

    totalCost = amountCost;

    var item = document.getElementById(id);

    var itemAmount = item.getElementsByClassName("amount")[0].value;

    var itemCost = item.getElementsByClassName("cost-item")[0].innerHTML.split(" ")[0];

    var itemAmountCost = item.getElementsByClassName("total-cost-item")[0];
    itemAmountCost.innerHTML =  `${(itemCost * itemAmount).toFixed(2)} €`;
}

async function changeAmount(id, option) {
    const itemId = document.getElementById(id);
    var amount = itemId.getElementsByClassName("amount")[0];
    var value = parseInt(amount.value);
    var update = true;

    if (amount.value != "" && amount.value >= 0) {
        if (option == "plus") {
            amount.value = value + 1;

            totalCart++;
        } else if (option == "less") {
            amount.value = subtract(value, 0);

            totalCart--;
        } else {
            if (option != "" && option >= 0) {
                var optionValue = parseInt(option);

                amount.value = optionValue;
                totalCart = optionValue;
            } else {
                update = false;
            }
        }

        if (amount.value == 0) {
            await setTimeout(() => {
                itemId.remove();
                isEmpty();
            }, 1000);
        }

        if (update) {
            updateSessionCart(id, amount.value);
            changeCost(id);
        }
    }
}

function updateSessionCart(id, amount) {
    var items = giveSession;

    items.forEach((item, index) => {
        if (item.item.id == id) {
            if (amount != 0) {
                item.amount = amount;
            } else {
                items.splice(index, 1);
            }
        }
    });

    sessionStorage.setItem("items", JSON.stringify(items));
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
    sessionStorage.removeItem("items");
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