var totalCart = sessionStorage.getItem("cartValue");
var maxValueCart = (value) => value < 100 ? value : `${99}+`;
var time = new Date();

const valueCart = document.getElementById("cart-value");
valueCart.value = totalCart != null ? maxValueCart(totalCart) : 0;

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

var getDate = `${zeroFill(time.getDate())}/${zeroFill(time.getMonth() + 1)}/${time.getFullYear()}`;
var getTime = `${time.getHours()}:${zeroFill(time.getMinutes())}:${zeroFill(time.getSeconds())}`;

const sum = (countNumber, number) => countNumber < number ? countNumber + 1 : maxStock(countNumber);
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

function changeTotalAmount(list) {
    const items = list;
    var totalAmount = 0;

    items.forEach(item => {
        totalAmount += parseInt(item.amount);
    });

    valueCart.value = maxValueCart(totalAmount);

    sessionStorage.setItem("cartValue", totalAmount);
}

function zeroFill(text) {
    text = text.toString();

    if (text.length == 1) {
        text = text.padStart(2, 0);
    }

    return text;
}


var alertPlaceholder = document.getElementById('liveAlert');

function maxStock(countNumber) {
    if (alertPlaceholder.innerHTML.length == 0) {
        alert('<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill" /></svg> NO QUEDA STOCK DISPONIBLE.', 'danger');
        var myAlert = document.getElementById('alert-content');

        myAlert.addEventListener('closed.bs.alert', () => {
            var removeElement = document.getElementById("alert");
            alertPlaceholder.removeChild(removeElement);
        });
    }


    var btnToCart = document.getElementById("420").childNodes[5];
    btnToCart.setAttribute("disabled", "");
    btnToCart.classList.remove("btn-to-cart");
    btnToCart.classList.add("btn");
    // btnToCart.classList.add("btn-sm");
    btnToCart.classList.add("btn-primary");

    return countNumber;
}

function alert(message, type) {
    var wrapper = document.createElement('div');
    wrapper.setAttribute("id", "alert");
    wrapper.innerHTML = '<div class="fade show alert alert-' + type + ' alert-dismissible" role="alert" id="alert-content">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

    alertPlaceholder.append(wrapper);
}