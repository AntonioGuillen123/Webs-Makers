var productList;

var shoppingCart = [];

const countProduct = 1;


async function startItems() {
    productList = await giveItems();

    addProducts();

    eventListener();

    orderBy("opt1");

    await checkButtons();
}


var sessionItems = JSON.parse(sessionStorage.getItem("items"));
if (sessionItems != null) sessionItems.forEach(element => addProductToShoppingCart(element.item, 0, element.amount));

function addProducts() {
    productList.items.forEach(element => {
        createProduct(element);
    });
}

async function searchProducts(value) {
    var itemList = document.getElementById("items-list");
    itemList.innerHTML = "";

    for (var i = 0; i < productList.items.length; i++) {
        if (productList.items[i].name.toLowerCase().includes(value.toLowerCase())) {
            createProduct(productList.items[i]);
        }
    }

    if (value.length === 0) {
        orderBy("opt1");
    } else {
        eventListener();
    }
    await checkButtons();
}

function createProduct(product) {

    var itemContainer = document.createElement("div");
    itemContainer.classList.add("product-card");
    itemContainer.classList.add(product.id);
    itemContainer.setAttribute("id", product.id);

    var divImage = document.createElement("div");
    divImage.classList.add("image");

    var abreviature = document.createElement("abbr");
    abreviature.title = product.id;

    var image = document.createElement("img");
    image.src = `../images/productsImg/${product.imageUrl}.png`;
    image.alt = "Lo siento, este producto no se ha encontrado :(";
    image.classList.add("product-image");

    var productName = document.createElement("h3");
    productName.innerHTML = product.name;
    productName.classList.add("product-name");

    var productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;
    productDescription.classList.add("product-description")


    var countContainer = document.createElement("div");
    countContainer.classList.add("count-container");

    var btnMinus = document.createElement("button");
    btnMinus.classList.add("btn-count");
    btnMinus.classList.add("minus");
    btnMinus.innerHTML = "-";
    btnMinus.setAttribute("id", product.id);


    var btnPlus = document.createElement("button");
    btnPlus.classList.add("btn-count");
    btnPlus.classList.add("plus");
    btnPlus.innerHTML = "+";
    btnPlus.setAttribute("id", product.id);


    var inputCount = document.createElement("input");
    inputCount.setAttribute("readonly", "");
    inputCount.type = "number";
    inputCount.value = countProduct;
    inputCount.min = countProduct;
    inputCount.classList.add("product-count");
    inputCount.setAttribute("count-id", product.id);


    var productPrice = document.createElement("p");
    productPrice.innerHTML = `${product.price}€`;
    productPrice.classList.add("product-price");

    var btnToCart = document.createElement("button");
    btnToCart.classList.add("btn-to-cart");
    btnToCart.classList.add("btn");
    btnToCart.classList.add("btn-outline-primary");
    btnToCart.setAttribute("id", product.id);
    btnToCart.innerHTML = "AÑADIR";

    abreviature.appendChild(image);
    divImage.appendChild(abreviature);
    countContainer.appendChild(btnMinus);
    countContainer.appendChild(inputCount);
    countContainer.appendChild(btnPlus);

    itemContainer.appendChild(divImage);
    itemContainer.appendChild(productName);
    itemContainer.appendChild(productDescription);
    itemContainer.appendChild(countContainer);
    itemContainer.appendChild(productPrice);
    itemContainer.appendChild(btnToCart);

    document.getElementById("items-list").appendChild(itemContainer);
}

function eventListener() {
    var cart = document.getElementsByClassName("btn-to-cart");

    for (let i = 0; i < cart.length; i++) {
        cart[i].addEventListener("click", () => {
            var productId = cart[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            addProductToShoppingCart(findProductById(productId), parseInt(selectCount.value), null);
            changeTotalAmount(shoppingCart);
            sessionStorage.setItem("items", JSON.stringify(shoppingCart));
            checkButtons();
        });
    }


    var plusBtn = document.getElementsByClassName("plus");

    for (let i = 0; i < plusBtn.length; i++) {
        plusBtn[i].addEventListener("click", () => {
            var productId = plusBtn[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            var countNumber = parseInt(selectCount.value);
            console.log(findProductById(productId));
            var productObject = findProductById(productId);
            var productAmountCartList = takeAmountProduct(productId);
            selectCount.value = sum(countNumber, productObject.stock, productAmountCartList, true);
            console.log(countNumber, productObject.stock);
        });
    }

    var minusBtn = document.getElementsByClassName("minus");

    for (let i = 0; i < minusBtn.length; i++) {
        minusBtn[i].addEventListener("click", () => {
            var productId = minusBtn[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            var countNumber = parseInt(selectCount.value);
            console.log(findProductById(productId));
            selectCount.value = subtract(countNumber, 1);
        });
    }
}

function orderItems() {
    var list = productList.slice();

    list.sort((a, b) => a.id - b.id);
}


function orderBy(value) {
    var productListPage = document.getElementById("items-list");
    var searchBar = document.getElementById("search-bar");
    var copyProductList = productList.items.slice();

    searchBar.value = "";
    productListPage.innerHTML = "";

    switch (value) {
        case "opt1":

            copyProductList = copyProductList.sort((a, b) => a.price - b.price);

            break;
        case "opt2":

            copyProductList = copyProductList.sort((a, b) => a.price - b.price).reverse();

            break;
        case "opt3":

            copyProductList = alphabeticalOrder(copyProductList);

            break;
        case "opt4":

            copyProductList = alphabeticalOrder(copyProductList).reverse();

            break;
    }

    copyProductList.forEach(product => createProduct(product));
    eventListener();
}

function alphabeticalOrder(productList) {

    productList.sort((a, b, result = 0) => {
        if (a.nombre < b.nombre) {
            result = -1;
        }
        if (a.nombre > b.nombre) {
            result = 1;
        }
        return result;
    });

    return productList;
}


function addProductToShoppingCart(product, selectCount, actualAmount) {

    var addProduct = true;
    var amount = 0;

    if (shoppingCart.length > 0) {
        shoppingCart.forEach(element => {
            if (element.item.id === product.id) {
                if (actualAmount != null) {
                    element.amount = parseInt(selectCount) + parseInt(actualAmount);
                } else {
                    element.amount = parseInt(selectCount) + parseInt(element.amount);
                }
                addProduct = false;
            }
        });
    }

    if (actualAmount != null) {
        amount = actualAmount;
    }
    else {
        amount = selectCount;
    }

    if (addProduct) {
        shoppingCart.push({
            "item": product,
            "amount": parseInt(amount)
        });
    }
}

function takeAmountProduct(productId) {
    var amountProductInCart = 0;

    shoppingCart.forEach(item => {
        if (item.item.id == productId) {
            amountProductInCart = item.amount;
        }
    });

    return amountProductInCart;
}

function checkButtons() {
    productList.items.forEach(item => {
        var productId = item.id;
        var productInputCount = document.querySelector(`[count-id='${productId}']`);

        if (item.stock === 0) {
            var productBtn = document.querySelector(`[id='${productId}'].btn-to-cart`);
            productBtn.setAttribute("disabled", "");
        } else if (takeAmountProduct(productId) + productInputCount.value >= item.stock) {
            var productBtn = document.querySelector(`[id='${productId}'].btn-to-cart`);
            productBtn.setAttribute("disabled", "");
        }
    });
}
