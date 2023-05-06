var count = 3;


function writePassword() {
    var truePassword = "asdf";

    var formAdmin = document.getElementById("formAdmin");

    var input = document.getElementById("data");
    var button = document.getElementById("submit");

    //submitPassword(input, button);

    var tries = document.getElementById("tries");
    var fail = document.getElementById("failPassword");

    //if (timeOut()) {
    if (input.value == truePassword) {
        window.location.href = "admin.html";
    }
    else {
        tries.innerHTML = `Intentos restantes: ${count}`;
        formAdmin.style.animation = "vibrate 0.5s alternate";
        if (count > 0) {
            if (input.value === "") {
                fail.innerHTML = "*No has introducido contraseña*";
                //alert("No has introducido contraseña");
            } else {
                fail.innerHTML = "*Contraseña incorrecta*";
                //alert("Contraseña incorrecta");
                input.value = "";
            }
            count--;
            formAdmin.style.animation = "vibrate 0.5s alternate";
        }
        else {
            alert("Ha alcanzado el máximo número de intentos\nNo ha podido entrar en modo Admin");
            window.location.href = "../index.html";
        }
    }
    /*} else {
        alert("Has alcanzado el máximo número de intentos\nPrueba de nuevo en 2 min");
    }*/
}

/* function submitPassword(input, button) {

    input.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            button.click();
        }
    });
} */

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