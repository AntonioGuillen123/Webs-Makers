

async function validateForm() {
  var form = document.getElementById("Form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var affair = document.getElementById("affair").value;

    var data = {
      "users": [
        {
          "email": email,
          "affair": affair,
          "message": message
        }
      ]
    };

    await createData(JSON.stringify(data));
    alert('Se ha subido correctamente.');
    form.reset();
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
  document.getElementById("map-button").addEventListener("click", function () {
    var mapContainer = document.getElementById("map-container");
    if (mapContainer.style.display === "none") {
      mapContainer.style.display = "block";
    } else {
      mapContainer.style.display = "none";
    }
  });
}
showMap();


