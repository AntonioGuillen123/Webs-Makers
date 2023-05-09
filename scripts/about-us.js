var titulos = document.querySelectorAll("#name");

for(var i = 0; i < titulos.length; i++ ){
    titulos[i].addEventListener("mouseover", function(){
        this.style.background = "#3554EE";
        this.style.color = "black";

    });
    titulos[i].addEventListener("mouseout", function(){
        this.style.background = "";
        this.style.color = "";
        
    })
}


var primerTitulo = document.getElementById("name");

primerTitulo.addEventListener("click", function(){
    var primerDiv = document.getElementById("personInfo");
    primerDiv.style.display = "flex";
})

