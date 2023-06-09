var giveSession = JSON.parse(sessionStorage.getItem("items"));
var totalPrice = 0;
var productList;
var canDelete = true;

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
        tableBody.appendChild(makeEmpty());
    } else {
        tableBody = createItems(items, tableBody);
        tableFooter = createFooter(tableFooter);
    }

    itemList.appendChild(tableBody);
    itemList.appendChild(tableFooter);
}

function isEmpty(clearAll) {
    var itemsContainer = document.getElementById("items");
    var items = itemsContainer.getElementsByTagName("tr").length;
    var footer = document.getElementById("footer-container");

    if ((clearAll || items == 0) && canDelete) {
        sessionStorage.removeItem("items");
        sessionStorage.setItem("cartValue", 0);

        itemsContainer.innerHTML = "";
        itemsContainer.appendChild(makeEmpty());

        valueCart.value = 0;
        footer.remove();
    }
}

function makeEmpty() {
    var empty = document.createElement("td");
    empty.setAttribute("id", "empty");
    empty.setAttribute("colspan", 6);
    empty.innerHTML = "SU CARRITO ESTÁ VACIO :(";
    canDelete = false;

    return empty;
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
        imageItem.src = `../images/productsImg/${item.item.imageUrl}.png`;
        imageItem.classList.add("image-item");

        var itemName = document.createElement("td");
        itemName.innerHTML = item.item.name;
        itemName.classList.add("name-item");

        var itemID = document.createElement("td");
        itemID.innerHTML = id;
        itemID.classList.add("id-item");

        var amountContainer = document.createElement("td");
        var amountDiv = document.createElement("div");
        amountDiv.classList.add("count-container");

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
        itemPrice.innerHTML = `${item.item.price}€`;
        itemPrice.classList.add("cost-item");

        var totalItemPrice = document.createElement("td");
        totalItemPrice.innerHTML = `${amountPrice.toFixed(2)}€`;
        totalItemPrice.classList.add("total-cost-item");

        itemsContainer.appendChild(itemContainer);
        itemContainer.appendChild(imageContainer);
        imageContainer.appendChild(imageItem);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemID);

        itemContainer.appendChild(amountContainer);
        amountContainer.appendChild(amountDiv);
        amountDiv.appendChild(lessButton);
        amountDiv.appendChild(itemAmount);
        amountDiv.appendChild(plusButton);

        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(totalItemPrice);
    });

    return itemsContainer;
}

function createFooter(footer) {
    var row = document.createElement("tr");
    var column = document.createElement("td");
    column.setAttribute("colspan", 6)
    var columnDiv = document.createElement("div");
    columnDiv.setAttribute("id", "footer-container");


    var buy = document.createElement("button");
    buy.setAttribute("id", "buy-table");
    buy.setAttribute("data-bs-toggle", "modal");
    buy.setAttribute("data-bs-target", "#exampleModal");
    buy.classList.add("btn");
    buy.classList.add("btn-outline-primary");
    buy.classList.add("btn-lg");
    buy.innerHTML = "COMPRAR";

    var clear = document.createElement("button");
    clear.classList.add("btn");
    clear.classList.add("btn-outline-primary");
    clear.classList.add("btn-lg");
    clear.innerHTML = "VACIAR";
    clear.addEventListener("click", () => isEmpty(true));

    var totalContainer = document.createElement("div");
    totalContainer.setAttribute("id", "total-container");

    var totalText = document.createElement("p");
    totalText.setAttribute("id", "total-text");
    totalText.innerHTML = "PRECIO TOTAL: ";

    var total = document.createElement("p");
    total.setAttribute("id", "total");
    total.innerHTML = `${totalPrice.toFixed(2)}€`;


    totalContainer.appendChild(totalText);
    totalContainer.appendChild(total);

    columnDiv.appendChild(buy);
    columnDiv.appendChild(clear);
    columnDiv.appendChild(totalContainer);

    column.appendChild(columnDiv);
    row.appendChild(column);

    footer.appendChild(row);

    return footer;
}

function changePrice(id) {
    var amountPrice = 0;

    var item = document.getElementById(id);

    var itemAmount = item.getElementsByClassName("amount")[0].value;

    var itemPrice = item.getElementsByClassName("cost-item")[0].innerHTML.split(" ")[0];

    var itemAmountPrice = item.getElementsByClassName("total-cost-item")[0];
    itemAmountPrice.innerHTML = `${(parseFloat(itemPrice) * parseInt(itemAmount)).toFixed(2)}€`;

    var allAmountPrice = document.getElementsByClassName("total-cost-item");

    var total = document.getElementById("total");

    for (var i = 0; i < allAmountPrice.length; i++) {
        amountPrice += parseFloat(allAmountPrice[i].innerHTML.split(" ")[0]);
    }

    totalPrice = parseFloat(amountPrice.toFixed(2));
    total.innerHTML = `${totalPrice}€`;
}

async function changeAmount(id, option) {
    const itemId = document.getElementById(id);
    var amount = itemId.getElementsByClassName("amount")[0];
    var value = parseInt(amount.value);
    var update = true;
    var item = findProductById(id);

    if (amount.value != "" && amount.value >= 0 && amount.value <= item.stock) {
        if (option == "plus") amount.value = sum(value, item.stock, 0, false);
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
                isEmpty(false);
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

function buttonState(text) {
    var button = document.getElementById("submit");

    if (text.length != 0) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
}

async function submit() {
    var name = document.getElementById("data").value;
    var items = giveSession;

    var data =
    {
        "users": [
            {
                "id": "",
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