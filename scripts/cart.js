var giveSession = JSON.parse(sessionStorage.getItem("items"));
var totalPrice = 0;
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

    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "items");

    var tableFooter = document.createElement("tfoot");
    tableFooter.setAttribute("id", "table-footer");

    if (items == null || items.length == 0) {
        tableBody.innerHTML = "SU CARRITO ESTÁ VACIO";
    } else {
        tableBody = createItems(items, tableBody);
        tableFooter = createFooter(tableFooter);
    }

    itemList.appendChild(tableBody);
    itemList.appendChild(tableFooter);
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
        const amountPrice = (parseFloat(item.item.price) * parseInt(item.amount));
        const id = item.item.id;

        totalPrice += amountPrice;

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
        itemAmount.addEventListener("change", () => changeAmount(id, itemAmount.value));

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
        totalItemPrice.innerHTML = `${amountPrice.toFixed(2)} €`;
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

function createFooter(footer){
    var buy = document.createElement("button");
    buy.setAttribute("id", "buy-table");
    buy.innerHTML = "COMPRAR";

    buy.addEventListener("click", () => {
        var finishContainer = document.getElementById("finish-container");
        finishContainer.style.display = "flex";

        closeSubmit(finishContainer);
    });

    var totalContainer = document.createElement("div");
    totalContainer.setAttribute("id", "total-container");

    var totalText = document.createElement("p");
    totalText.setAttribute("id", "total-text");
    totalText.innerHTML = "PRECIO TOTAL: ";

    var total = document.createElement("p");
    total.setAttribute("id", "total");
    total.innerHTML = `${totalPrice.toFixed(2)} €`;

    footer.appendChild(buy);
    footer.appendChild(totalContainer);

    totalContainer.appendChild(totalText);
    totalContainer.appendChild(total);

    return footer;
}

function closeSubmit(finishContainer){
    var data = document.getElementById("data");
    var button = document.getElementById("submit");
    var close = document.getElementById("close");

    data.value = "";

    button.style.display = "none";

    close.addEventListener("click", () => {
        finishContainer.style.display = "none";
    });
}

function changePrice(id) {
    var amountPrice = 0;

    var item = document.getElementById(id);

    var itemAmount = item.getElementsByClassName("amount")[0].value;

    var itemPrice = item.getElementsByClassName("cost-item")[0].innerHTML.split(" ")[0];

    var itemAmountPrice = item.getElementsByClassName("total-cost-item")[0];
    itemAmountPrice.innerHTML = `${(parseFloat(itemPrice) * parseInt(itemAmount)).toFixed(2)} €`;

    var allAmountPrice = document.getElementsByClassName("total-cost-item");

    var total = document.getElementById("total");

    for (var i = 0; i < allAmountPrice.length; i++) {
        amountPrice += parseFloat(allAmountPrice[i].innerHTML.split(" ")[0]);
    }

    totalPrice = parseFloat(amountPrice.toFixed(2));
    total.innerHTML = `${totalPrice} €`;
}

async function changeAmount(id, option) {
    const itemId = document.getElementById(id);
    var amount = itemId.getElementsByClassName("amount")[0];
    var value = parseInt(amount.value);
    var update = true;
    var item = findProductById(id);

    if (amount.value != "" && amount.value >= 0 && amount.value <= item.stock) {
        if (option == "plus") amount.value = sum(value, item.stock);
        else if (option == "less") amount.value = subtract(value, 0);
        else {
            if (option != "" && option >= 0) {
                var optionValue = parseInt(option);

                amount.value = optionValue;
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
            changeTotalAmount(giveSession);
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

function buttonState(text) { //TODO CHANGESSSS SUJETO A CAMBIOS COMO LO DEL PAYPAL...
    var button = document.getElementById("submit");

    if (text.length != 0) {
        button.style.display = "inline";
    } else {
        button.style.display = "";
    }
}

async function submit() {
    var name = document.getElementById("data").value;
    var items = giveSession;

    var data =
    {
        "users": [
            {
                "user": name,
                "items": [
                ],
                "date": getDate,
                "time": getTime
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
    sessionStorage.removeItem("cartValue");

    window.location.href = "../index.html";
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