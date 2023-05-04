var count = 3;


function writePassword() {
    var truePassword = "asdf";

    var input = document.getElementById("data");

    var p = document.getElementById("tries");

    //if (timeOut()) {
    if (input.value == truePassword) {
        window.location.href = "admin.html";
    }
    else {
        p.innerHTML = `*Intentos restantes: ${count}*`;

        if (count > 0) {
            if (input.value === "") {
                alert("No has introducido contraseña");
            } else {
                alert("Contraseña incorrecta");
                input.value = "";
            }
            count--;
        }
        else {
            alert("Se ha quedado sin intentos\nNo puede entrar en modo Admin");
            window.location.href = "../index.html";
        }
    }
    /*} else {
        alert("Has alcanzado el máximo número de intentos\nPrueba de nuevo en 2 min");
    }*/
}

/*function timeOut() {
    var session = sessionStorage.getItem("timeOut");
    var datetime = new Date();
    var minutes = datetime.getMinutes();
    var canTry = false;

    if (session == null || session >= minutes) {
        canTry = true;
    } else {
        canTry = false;
    }

    if (count == 0) {
        sessionStorage.setItem("timeOut", finalTime(minutes));
        count = 3;
    }

    return canTry;
}

function finalTime(minutes) {
    minutes += 2;

    if (minutes > 67) {
        minutes = minutes % 10;
    }

    return minutes;
}*/