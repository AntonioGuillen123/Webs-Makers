var totalCart = 0;


console.log(`Este es el número total de cosas añadidas al carrito no te asustes Fernando xd : ${totalCart}`);

seeSoon();

function seeSoon() {
    var favicon = document.querySelector("[rel='shortcut icon']");;
    const title = document.title;
    const thisFavicon = favicon.href;
    const mainFavicon = "../images/favicons/mainfavicon.png";

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            document.title = "Vuelva Pronto...";
            favicon.href = mainFavicon;
        } else {
            document.title = title;
            favicon.href = thisFavicon;
        }
    })
}

const sum = (countNumber, stock) => countNumber < stock ? countNumber + 1 : countNumber; 
const subtract = (countNumber, number) => countNumber > number ? countNumber - 1 : countNumber;

async function giveItems() {
    const response = await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/items");
    const data = await response.json();

    return data;
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