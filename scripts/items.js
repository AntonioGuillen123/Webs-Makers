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
    itemContainer.classList.add("item");
    itemContainer.classList.add(product.id);

    var divImage = document.createElement("div");
    divImage.classList.add("image");

    var image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = "Lo siento, este producto no se ha encontrado :(";
    image.classList.add("product-image");

    var tableContainer = document.createElement("table");
    var tableTitle = document.createElement("tr");
    var tableValue = document.createElement("tr");
    tableContainer.appendChild(tableTitle);
    tableContainer.appendChild(tableValue);

    var productNameTitle = document.createElement("th");
    productNameTitle.innerHTML = "Nombre";
    tableTitle.appendChild(productNameTitle);

    var productNameValue = document.createElement("td");
    productNameValue.innerHTML = product.name;
    tableValue.appendChild(productNameValue);


    var identificationTitle = document.createElement("th");
    identificationTitle.innerHTML = "ID";
    tableTitle.appendChild(identificationTitle);


    var identificationValue = document.createElement("td");
    identificationValue.innerHTML = product.id;
    tableValue.appendChild(identificationValue);

    var descriptionTitle = document.createElement("th");
    descriptionTitle.innerHTML = "Descripción";
    tableTitle.appendChild(descriptionTitle);


    var descriptionValue = document.createElement("td");
    descriptionValue.innerHTML = product.description;
    tableValue.appendChild(descriptionValue);

    var priceTitle = document.createElement("div");
    priceTitle.innerHTML = "Precio";
    priceTitle.classList.add("price");

    var priceValue = document.createElement("p");
    priceValue.innerHTML = product.cost;

    var descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("descriptionContainer");

    var countTitle = document.createElement("div");
    countTitle.innerHTML = "Cantidad";
    countTitle.classList.add("count");

    var countValue = document.createElement("p");
    countValue.innerHTML = countProduct;
    countValue.setAttribute("count-id", product.id);

    var addCartButton = document.createElement("button");
    addCartButton.innerHTML = "Añadir al carrito";
    addCartButton.classList.add("btn-cart");
    addCartButton.setAttribute("id", product.id);

    var minus = document.createElement("img");
    minus.classList.add("minus");
    minus.src = "https://cdn-icons-png.flaticon.com/512/10513/10513669.png";
    minus.setAttribute("id", product.id);

    var plus = document.createElement("img");
    plus.classList.add("plus");
    plus.src = "https://cdn-icons-png.flaticon.com/512/10513/10513669.png";
    plus.setAttribute("id", product.id);

    var signContainer = document.createElement("div");
    signContainer.classList.add("signContainer");
    signContainer.appendChild(minus);
    signContainer.appendChild(countValue);
    signContainer.appendChild(plus);

    var countContainer = document.createElement("div");
    countContainer.classList.add("countContainer");

    countTitle.appendChild(signContainer);
    priceTitle.appendChild(priceValue);
    itemContainer.appendChild(divImage);
    itemContainer.appendChild(descriptionContainer);
    descriptionContainer.appendChild(tableContainer);
    descriptionContainer.appendChild(countContainer);
    countContainer.appendChild(priceTitle);
    countContainer.appendChild(countTitle);
    countContainer.appendChild(addCartButton);
    divImage.appendChild(image);

    document.getElementById("items-list").appendChild(itemContainer);
}

function eventListener() {
    var cart = document.getElementsByClassName("btn-cart");

    for (let i = 0; i < cart.length; i++) {
        cart[i].addEventListener("click", () => {
            var productId = cart[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            console.log(findProductById(productId));
            shoppingCart.push({
                "item": findProductById(productId),
                "amount": selectCount.innerHTML
            });
            console.log(shoppingCart);
        });
    }

        sessionStorage.setItem("items", JSON.stringify(shoppingCart));

    // DE MOMENTO SE QUEDA ASÍ PERO LUEGO HABRÁ QUE HACER EL CODIGO MÁS EFICIENTE Y LUEGO COMPROBAR
    // QUE A LA HORA DE SUMAR Y RESTAR NI SE PASE PARA ARRIBA NI PARA ABAJO :) | :(

    var plusBtn = document.getElementsByClassName("plus");

    for (let i = 0; i < plusBtn.length; i++) {
        plusBtn[i].addEventListener("click", () => {
            var productId = plusBtn[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            var countNumber = parseInt(selectCount.innerHTML);
            console.log(findProductById(productId));
            selectCount.innerHTML = countNumber + 1;
        });
    }

    var minusBtn = document.getElementsByClassName("minus");

    for (let i = 0; i < minusBtn.length; i++) {
        minusBtn[i].addEventListener("click", () => {
            var productId = minusBtn[i].getAttribute("id");
            var selectCount = document.querySelector(`[count-id='${productId}']`);
            var countNumber = parseInt(selectCount.innerHTML);
            console.log(findProductById(productId));
            selectCount.innerHTML = countNumber - 1;
        });
    }
}

function orderItems() {
    var list = productList.slice();

    list.sort((a, b) => a.id - b.id);

    console.log(list);
}

function findProductById(productId) {
    var result = null;
    productList.items.forEach(element => {
        if (element.id == productId) {
            result = element;
        }
    });
    return result;
}
