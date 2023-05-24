async function startIndex() {
    enterAdmin();
    await checkStock();
}

function enterAdmin() {
    var logo = document.getElementById("logoImg");
    var go = false;

    logo.addEventListener("mouseover", () => {
        go = true;

        logo.style.transform = "rotate(360deg)";

        setTimeout(() => {
            if (go) {
                logo.style.transform = "none";

                setTimeout(() => {
                    window.location.href = "pages/password.html";
                }, 1000);
            }
        }, 8000);
    });

    logo.addEventListener("mouseleave", () => {
        go = false;

        logo.style.transform = "none";
    });
}

async function checkStock() {

    var items = await giveItems();

    var divContainer = document.getElementById("fewUnits");
    var title = document.getElementById("pocas");
    var cont = 0;

    for (var i = 0; i < items.items.length; i++) {

        var id = items.items[i].id;

        // Te lo he cambiado porque antes basicamente lo que hacía es
        // que si el último era menor o mayor a 300 hacia lo que sea pero solo el último
        // de la coleccion porque se sobreescribía
        // Y este método es como el All de LINQ C#
        var stock = items.items[i].stock;

        if (stock <= 5 && stock > 0) {
            title.classList.add("title");
            title.innerHTML = "¡Quedan pocas unidades!";


            var a = document.createElement("a");
            a.setAttribute("href", `pages/items.html#${id}`);
            var divProduct = document.createElement("div");
            divProduct.classList.add("divProduct");
            a.classList.add("a");
            a.appendChild(divProduct);
            divContainer.appendChild(a);


            var productName = items.items[i].name;
            var pName = document.createElement("p");
            pName.textContent = productName;
            pName.classList.add("productName");
            divProduct.appendChild(pName);

            var productPhoto = items.items[i].imageUrl;
            var img = document.createElement("img");
            img.src = `images/productsImg/${productPhoto}.png`;
            img.classList.add("productImage");
            divProduct.appendChild(img);

            var productDescription = items.items[i].description;
            var pDescription = document.createElement("p");
            pDescription.textContent = productDescription;
            pDescription.classList.add("productDescription");
            divProduct.appendChild(pDescription);

            var productPrice = items.items[i].price;
            var pPrice = document.createElement("p");
            pPrice.textContent = "Precio por unidad: " + productPrice + "€";
            pPrice.classList.add("productPrice");
            divProduct.appendChild(pPrice);

            cont++;
        }

    }
    if (cont === 0) {
        var fullProducts = document.createElement("h3");
        fullProducts.innerHTML = "¡Qué suerte! Tenemos el stock lleno de todos los productos";
        fullProducts.classList.add("fullProducts");
        divContainer.appendChild(fullProducts);
    }
}