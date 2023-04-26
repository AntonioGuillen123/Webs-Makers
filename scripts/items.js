function searchProducts(value) {
    // var document = pokemonList;

    document.innerHTML = "";
    var select = sessionStorage.getItem("select");
    var split, generation;
    for (var i = 0; i < listPokemons.length; i++) {
        if (listPokemons[i].name.toUpperCase().includes(valor.toUpperCase())) {
            createProduct(listPokemons[i]);
        }
    }
}

function createProduct(product){

    var itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    var divImage = document.createElement("div");
    divImage.classList.add("image");

    var image = document.createElement("img");
    image.src = "https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png";
    image.alt = "Lo siento, este producto se ha encontrado :(";
    image.classList.add("product-image");

    var productName = document.createElement("div");
    productName.classList.add("name");
    productName.innerHTML = "Plátano";

    var identification = document.createElement("div");
    identification.classList.add("id");
    identification.innerHTML = "1";

    var description = document.createElement("div");
    description.classList.add("description");

    document.getElementById("items-list").appendChild(enlace);
    enlace.appendChild(bicho);
    itemContainer.appendChild(divImage);
    itemContainer.appendChild(productName);
    itemContainer.appendChild(identification);
    itemContainer.appendChild(description);
    divImage.appendChild(image);
}