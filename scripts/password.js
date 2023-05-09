var count = 3;

function writePassword() {
    var truePassword = "asdf";

    var input = document.getElementById("data");
    var tries = document.getElementById("tries");
    var fail = document.getElementById("failPassword");
    var formAdmin = document.getElementById("formAdmin");
    //var button = document.getElementById("submit");

    if (input.value == truePassword) {
        window.location.href = "admin.html";
    }
    else {
        formAdmin.classList.add("vibration");
        removeVibration(formAdmin);
        tries.innerHTML = `Intentos restantes: ${count}`;
        if (count > 0) {
            if (input.value === "") {
                fail.innerHTML = "*No has introducido contraseña*";
            } else {
                fail.innerHTML = "*Contraseña incorrecta*";
                input.value = "";
            }
            count--;
        }
        else {
            alert("Ha alcanzado el máximo número de intentos\nNo ha podido entrar en modo Admin");
            window.location.href = "../index.html";
        }
    }
}

function removeVibration(formAdmin) {
    setTimeout(() => {
            formAdmin.classList.remove("vibration");
          }, 500);
}