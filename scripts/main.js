async function giveItems(){
    const response = await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/items");
    const data = await response.json();

    return data;
}