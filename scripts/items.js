var productList;

/*Esto es una prueba para enviar los items al carrito*/
// EL JSON TIENE QUE TRAER UN ARRAY DE OBJETOS, EN CADA OBJETO TIENE QUE HABER UNA SINTAXIS COMO LA DE ABAJO, ES DECIR, 
// TIENE QUE APARECER UN OBJETO CON EL PRODUCTO Y LA CANTIDAD DE ESTE
// TAMBIÉN IDEA DE VARIABLE EN EL MAIN PARA TODOS QUE SALGA EL CARRITO DE COMPRA EN TODDAS LAS VISTAS Y CADA VEZ QUE SE LE SUME UNO U SE LE RESTE, SE CAMBIE

var shoppingCart = [];

var countProduct = 1;




console.log(shoppingCart);

/*FIN :)*/

async function startItems() {
    productList = await giveItems();

    addProducts();

    eventListener();
}

function addProducts() {
    productList.items.forEach(element => {
        createProduct(element);
    });
}

function searchProducts(value) {
    var itemList = document.getElementById("items-list");
    itemList.innerHTML = "";

    for (var i = 0; i < productList.items.length; i++) {
        if (productList.items[i].name.toLowerCase().includes(value.toLowerCase())) {
            createProduct(productList.items[i]);
        }
    }
}

function createProduct(product) {

    var itemContainer = document.createElement("div");
    itemContainer.classList.add("product-card");
    itemContainer.classList.add(product.id);

    var divImage = document.createElement("div");
    divImage.classList.add("image");

    var image = document.createElement("img");
    image.src = product.imageUrl;
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
    inputCount.type = "number";
    inputCount.value = 1;
    inputCount.min = 1;
    inputCount.classList.add("product-count");
    inputCount.setAttribute("count-id", product.id);


    var productPrice = document.createElement("p");
    productPrice.innerHTML = product.price;
    productPrice.classList.add("product-price");

    var btnToCart = document.createElement("button");
    btnToCart.innerHTML = "Añadir al carrito";
    btnToCart.classList.add("btn-to-cart");
    btnToCart.setAttribute("id", product.id);

    divImage.appendChild(image);
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
            console.log(findProductById(productId));
            shoppingCart.push({
                "item": findProductById(productId),
                "amount": selectCount.value
            });
            console.log(shoppingCart);
            sessionStorage.setItem("items", JSON.stringify(shoppingCart));
        });
    }


    // DE MOMENTO SE QUEDA ASÍ PERO LUEGO HABRÁ QUE HACER EL CODIGO MÁS EFICIENTE Y LUEGO COMPROBAR
    // QUE A LA HORA DE SUMAR Y RESTAR NI SE PASE PARA ARRIBA NI PARA ABAJO :) | :(

    var plusBtn = document.getElementsByClassName("plus");

    for (let i = 0; i < plusBtn.length; i++) {
        plusBtn[i].addEventListener("click", () => {
            var productId = plusBtn[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            var countNumber = parseInt(selectCount.value);
            console.log(findProductById(productId));
            var productObject = findProductById(productId);
            selectCount.value = sum(countNumber, productObject.stock);
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

    console.log(list);
}


function orderBy(value) {
    var productListPage = document.getElementById("items-list");
    var copyProductList = productList.items.slice();

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