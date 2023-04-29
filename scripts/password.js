var URL = window.location.search;

function writePassword() {
    var truePassword = "asdf";

    var input = document.getElementById("data");

    var div = document.getElementById("finish");
    var p = document.createElement("p");

    var count = 0;

    if(input.value == truePassword){
        p.innerHTML = "Has entrado con la contraseña: " + input.value;
        input.value = "";
        URL = "../pages/"
    }
    else{
        if (input.value === "") {
            alert("No has introducido contraseña");
        }else{
            alert("Contraseña incorrecta");
            input.value = "";
        }
    }

    div.appendChild(p);
}