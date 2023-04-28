var giveSession = () => sessionStorage.getItem("products").split(',');

var ho = [];

for(var i = 0; i < 10; i++){
    ho.push(i);
}

sessionStorage.setItem("products", ho);

function startCart(){
    itemList();
}

function itemList(){
    const itemList = document.getElementById("item-list");
    var itemCount = giveSession();

    var items = document.createElement("div");

    if(itemCount == 0){
        items.innerHTML = "SU CARRITO ESTÁ VACIO";
    }else{
        items.innerHTML = "Estos soon los productossss";
    }

    itemList.appendChild(items);
}

async function submit(){
    var name = document.getElementById("data").value;
    var itemCount = giveSession();

    const data = 
    {
        "users": [
            {
                "user": name,
                "items": [
                ]
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