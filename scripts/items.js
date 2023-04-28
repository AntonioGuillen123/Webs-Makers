const productList = [
    {
        "name": "banana",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta amarilla, rica en potasio y original de canarias"
    },
    {
        "name": "manzana",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta roja, rica en vitaminas"
    },
    {
        "name": "Naranja",
        "imageUrl": "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "description": "Esto es una fruta naranja, rica en vitaminas C, proviene del Tesorillo"
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

    var productName = document.createElement("div");
    productName.classList.add("name");
    productName.innerHTML = product.name;

    var identification = document.createElement("div");
    identification.classList.add("id");
    identification.innerHTML = "1";

    var description = document.createElement("div");
    description.classList.add("description");
    description.innerHTML = product.description;

    itemContainer.appendChild(divImage);
    itemContainer.appendChild(productName);
    itemContainer.appendChild(identification);
    itemContainer.appendChild(description);
    divImage.appendChild(image);

    document.getElementById("items-list").appendChild(itemContainer);
}