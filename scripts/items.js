const productList = [
    {
        "name": "banana",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta amarilla, rica en potasio y original de canarias",
        "id": 3
    },
    {
        "name": "manzana",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta roja, rica en vitaminas",
        "id": 2
    },
    {
        "name": "Naranja",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta naranja, rica en vitaminas C, proviene del Tesorillo",
        "id": 1
    }
];

function addProducts(){
    productList.forEach(product => {
        createProduct(product);
    });
}

function searchProducts(value) {
    var itemList = document.getElementById("items-list");
    itemList.innerHTML = "";

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
            createProduct(productList[i]);
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

    // var productName = document.createElement("div");
    // productName.classList.add("name");

    var productNameTitle = document.createElement("th");
    productNameTitle.innerHTML = "Nombre";
    tableTitle.appendChild(productNameTitle);

    var productNameValue = document.createElement("td");
    productNameValue.innerHTML = product.name;
    tableValue.appendChild(productNameValue);



    // var identification = document.createElement("div");
    // identification.classList.add("id");

    var identificationTitle = document.createElement("th");
    identificationTitle.innerHTML = "ID";
    tableTitle.appendChild(identificationTitle);


    var identificationValue = document.createElement("td");
    identificationValue.innerHTML = "1";
    tableValue.appendChild(identificationValue);


    // var description = document.createElement("div");
    // description.classList.add("description");

    var descriptionTitle = document.createElement("th");
    descriptionTitle.innerHTML = "Descripción";
    tableTitle.appendChild(descriptionTitle);
    

    var descriptionValue = document.createElement("td");
    descriptionValue.innerHTML = product.description;
    tableValue.appendChild(descriptionValue);


    itemContainer.appendChild(divImage);
    // itemContainer.appendChild(productName);
    // itemContainer.appendChild(identification);
    // itemContainer.appendChild(description);
    itemContainer.appendChild(tableContainer);
    divImage.appendChild(image);
    // productName.appendChild(productNameTitle);
    // productName.appendChild(productNameValue);
    // identification.appendChild(identificationTitle);
    // identification.appendChild(identificationValue);
    // description.appendChild(descriptionTitle);
    // description.appendChild(descriptionValue);

    document.getElementById("items-list").appendChild(itemContainer);
}

function orderItems(){
    var list = productList.slice();

    // list.id.sort(function(a, b){return a - b});


    list.sort((a, b) => a.id - b.id);

    console.log(list);
}