var productList;

/*Esto es una prueba para enviar los items al carrito*/
// EL JSON TIENE QUE TRAER UN ARRAY DE OBJETOS, EN CADA OBJETO TIENE QUE HABER UNA SINTAXIS COMO LA DE ABAJO, ES DECIR, 
// TIENE QUE APARECER UN OBJETO CON EL PRODUCTO Y LA CANTIDAD DE ESTE
// TAMBIÉN IDEA DE VARIABLE EN EL MAIN PARA TODOS QUE SALGA EL CARRITO DE COMPRA EN TODDAS LAS VISTAS Y CADA VEZ QUE SE LE SUME UNO U SE LE RESTE, SE CAMBIE

var shoppingCart = [];

for(var i = 0; i < 3; i++){
    shoppingCart.push({
        "item": `object${i+1}`,
        "amount": 3
    });
}

sessionStorage.setItem("items", JSON.stringify(shoppingCart));

console.log(shoppingCart);

/*FIN :)*/

async function startItems(){
    productList = await giveItems();

   addProducts();
}

function addProducts(){
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


    itemContainer.appendChild(divImage);
    itemContainer.appendChild(tableContainer);
    divImage.appendChild(image);

    document.getElementById("items-list").appendChild(itemContainer);
}

function orderItems(){
    var list = productList.slice();

    list.sort((a, b) => a.id - b.id);

    console.log(list);
}