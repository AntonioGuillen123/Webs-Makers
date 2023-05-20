async function startIndex() {
    var logo = document.getElementById("logoImg");
    var go = false;

    logo.addEventListener("mouseover", () => {
        go = true;

        logo.style.transform = "rotate(360deg)";
        logo.style.webkitTransform = "rotate(360deg)";

        setTimeout(() => {
            if (go) {
                logo.style.transform = "none";
                logo.style.webkitTransform = "none"

                setTimeout(() => {
                    window.location.href = "pages/password.html";
                }, 1000);
            }
        }, 10000);
    });

    logo.addEventListener("mouseleave", () => {
        go = false;

        logo.style.transform = "none";
        logo.style.webkitTransform = "none"
    });
}

fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/items")
            .then((response) => response.json())
            .then(response =>{
                var divContainer = document.getElementById("fewUnits");
                var title = document.createElement("h3");
                title.innerHTML = "¡Quedan pocas unidades!";
                title.classList.add("title");
                divContainer.appendChild(title);
                
                for(var i = 0; i < response.items.length; i++){
                    var stock = response.items[i].stock;
                    var id = response.items[i].id;
                    if(stock < 300){
                        
                        var a = document.createElement("a");
                        a.setAttribute("href", `pages/items.html#${id}`);
                        var divProduct = document.createElement("div");
                        divProduct.classList.add("divProduct");
                        a.classList.add("a");
                        a.appendChild(divProduct);
                        divContainer.appendChild(a);


                        var productName = response.items[i].name;
                        var pName = document.createElement("p");
                        pName.textContent = productName;
                        pName.classList.add("productName");
                        divProduct.appendChild(pName);

                        var productPhoto = response.items[i].imageUrl;
                        var img = document.createElement("img");
                        img.src = productPhoto;
                        img.classList.add("productImage");
                        divProduct.appendChild(img);

                        var productDescription = response.items[i].description;
                        var pDescription = document.createElement("p");
                        pDescription.textContent = productDescription;
                        pDescription.classList.add("productDescription");
                        divProduct.appendChild(pDescription);

                        var productPrice = response.items[i].price;
                        var pPrice = document.createElement("p");
                        pPrice.textContent = "Precio por unidad: " + productPrice + "€";
                        pPrice.classList.add("productPrice");
                        divProduct.appendChild(pPrice);


                    }
                    else{
                        while(divContainer.firstChild){
                            divContainer.removeChild(divContainer.firstChild);
                        }
                        var fullProducts = document.createElement("h3");
                        fullProducts.innerHTML = "¡Qué suerte! Tenemos el stock lleno de todos los productos";
                        fullProducts.classList.add("fullProducts");
                        divContainer.appendChild(fullProducts);
                        

                    }
                }

            })