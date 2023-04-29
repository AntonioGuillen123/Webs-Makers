var giveSession = JSON.parse(sessionStorage.getItem("items"));

function startCart(){
    itemList();
}

function itemList(){
    const itemList = document.getElementById("item-list");
    var items = giveSession;

    var itemm = document.createElement("div");

    if(items?.length >= 1){
        itemm.innerHTML = "Estos soon los productossss";
    }else{
        itemm.innerHTML = "SU CARRITO ESTÁ VACIO";
    }

    itemList.appendChild(itemm);
}

function buttonState(text){
    var button = document.getElementById("submit");

    if(text.length != 0){
        button.style.display = "flex";
    }else{
        button.style.display = "";
    }
}

function zeroFill(text){
    text = text.toString();

    if(text.length == 1){
        text = text.padStart(1, 0);
    }

    return text;
}

async function submit(){
    var name = document.getElementById("data").value;
    var itemCount = giveSession;

    const time = new Date();
    const dateShop = `${zeroFill(time.getDay())}/${zeroFill(time.getMonth())}/${time.getFullYear()}`;
    const timeShop = `${time.getHours()}:${zeroFill(time.getMinutes())}:${zeroFill(time.getSeconds())}`;

    const data = 
    {
        "users": [
            {
                "user": name,
                "items": [
                ],
                "date": dateShop,
                "time": timeShop
            }
        ]
    };

    for(var i = 0; i < itemCount.length; i++){
        data.users[0].items.push({
            "id": i.toString().padStart(3, 0),
            "name": itemCount[i],
            "amount": itemCount[i] + 1
        });
    }

    await uploadData(JSON.stringify(data));
}

async function uploadData(data) {
    await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/cart-shopping", {
        method: "PUT",
        body: data,
        headers: {
            "Content-type": "application/json",
        }
    });
}