var giveSession = JSON.parse(sessionStorage.getItem("items"));
var totalPrice;
var productList;

/*TODO :)
document.getElementById("jii").addEventListener("click", () => {
    document.getElementById("finish-container").style.display = "flex";
});*/

async function startCart() {
    productList = await giveItems();

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
        const amountPrice = (item.item.price * parseInt(item.amount)).toFixed(2);
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

        var itemPrice = document.createElement("td");
        itemPrice.innerHTML = `${item.item.price} €`;
        itemPrice.classList.add("cost-item");

        var totalItemPrice = document.createElement("td");
        totalItemPrice.innerHTML = `${amountPrice} €`;
        totalItemPrice.classList.add("total-cost-item");

        itemsContainer.appendChild(itemContainer);
        itemContainer.appendChild(imageContainer);
        imageContainer.appendChild(imageItem);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemID);

        itemContainer.appendChild(amountContainer);
        amountContainer.appendChild(lessButton);
        amountContainer.appendChild(itemAmount);
        amountContainer.appendChild(plusButton);

        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(totalItemPrice);
    });

    return itemsContainer;
}

function changePrice(id) {
    /*TODO
        Aqui tengo que bindear el actualizar la cantidad con el actualizar el precio total, cuando haya un elemento en el DOM se hará :))))))
     */
    var amountPrice = 0;

    var allAmountPrice = document.getElementsByClassName("total-cost-item");

    for (var i = 0; i < allAmountPrice.length; i++) {
        amountPrice += parseFloat(allAmountPrice[i].innerHTML.split(" ")[0]).toFixed(2);
    }

    totalPrice = amountPrice;

    var item = document.getElementById(id);

    var itemAmount = item.getElementsByClassName("amount")[0].value;

    var itemPrice = item.getElementsByClassName("cost-item")[0].innerHTML.split(" ")[0];

    var itemAmountPrice = item.getElementsByClassName("total-cost-item")[0];
    itemAmountPrice.innerHTML = `${(itemPrice * itemAmount).toFixed(2)} €`;
}

async function changeAmount(id, option) {
    const itemId = document.getElementById(id);
    var amount = itemId.getElementsByClassName("amount")[0];
    var value = parseInt(amount.value);
    var update = true;
    var item = findProductById(id);

    if (amount.value != "" && amount.value >= 0 && amount.value <= item.stock) {
        if (option == "plus") {
            amount.value = sum(value, item.stock);

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
            changePrice(id);
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
    const dateShop = `${zeroFill(time.getDate())}/${zeroFill(time.getMonth() + 1)}/${time.getFullYear()}`;
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

    items.forEach(item => {
        data.users[0].items.push({
            "id": item.item.id,
            "name": item.item.name,
            "amount": item.amount
        });
    });

    updateStock(data);

    await uploadData(JSON.stringify(data));
    sessionStorage.removeItem("items");
}

async function updateStock(items) {
    items.users[0].items.forEach(item => {
        var itemInfo = findProductById(item.id);
        var newStock = itemInfo.stock - item.amount;

        itemInfo.stock = newStock > 0 ? newStock : 0;
    });

    await uploadItems(JSON.stringify(productList));
}

async function uploadData(data) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping", {
        method: "PUT",
        body: data,
        headers: {
            "Content-type": "application/json"
        }
    });
}

async function uploadItems(items) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/items", {
        method: "POST",
        body: items,
        headers: {
            "Content-type": "application/json"
        }
    });
}