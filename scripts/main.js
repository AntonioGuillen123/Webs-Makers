var totalCart = 0;

console.log(`Este es el número total de cosas añadidas al carrito no te asustes Fernando xd : ${totalCart}`);

seeSoon();

function seeSoon(){
    const title = document.title;
    var favicon = document.getElementById("favicon");
    const thisFavicon = favicon.href;
    const mainFavicon = "../images/favicons/mainfavicon.png";

    document.addEventListener("visibilitychange", () => {
        if(document.hidden){
            document.title = "Vuelva Pronto...";
            favicon.href = mainFavicon;
        }else{
            document.title = title;
            favicon.href = thisFavicon;
        }
    })
}

async function giveItems(){
    const response = await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/items");
    const data = await response.json();

    return data;
}