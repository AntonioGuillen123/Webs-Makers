

async function validateForm() {
  var form = document.getElementById("Form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var affair = document.getElementById("affair").value;
    if (email === '' || message === '') {
      alert('Porfavor introduzca un email y mensaje valido.');
    } else {

    var data = {
      "users": [
        {
          "id": "",
          "email": email,
          "affair": affair,
          "message": message,
          "date": getDate,
          "time": getTime
        }
      ]
    };

    await createData(JSON.stringify(data));
    alert('Se ha subido correctamente.');
    form.reset();

  }
  });
}

validateForm();


async function createData(data) {
  await fetch("https://getpantry.cloud/apiv1/pantry/f05c7024-db22-4ef2-9691-d82f3c50cd0e/basket/form", {
    method: "PUT",
    body: data,
    headers: {
      "Content-type": "application/json"
    }
  });
}

function showMap() {
  var mapContainer = document.getElementById("map-container");
  var buttonContainer = document.getElementById("button-container");
  var mapButton = document.getElementById("map-button");
  var isMapVisible = false;

  mapButton.addEventListener("click", function () {
    if (isMapVisible) {
      mapContainer.style.display = "none";
      buttonContainer.style.display = "none";
      mapButton.textContent = "Mostrar mapa";
    } else {
      mapContainer.style.display = "block";
      buttonContainer.style.display = "flex";
      mapButton.textContent = "Ocultar mapa";
    }
    isMapVisible = !isMapVisible;
  });
}

  showMap();





