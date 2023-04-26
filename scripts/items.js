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
