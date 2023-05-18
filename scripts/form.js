

async function validateForm() {

    var form = document.getElementById("Form")
    
    form.addEventListener("submit", async function(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var affair = document.getElementById("affair").value;
        if (email === '' || message === '') {
            alert('Porfavor introduzca un email y mensaje valido.');
          } else {
            var data = {
              "List": [
                {
                  
                  "items": [
                    {
                      "email": email,
                      "affair": affair,
                      "message": message
                    }
                  
                  ]
                }
              ]
            };
            await createData(JSON.stringify(data));
            alert('Se ha subido correctamente.');
            form.reset();
            
          }
        });


};

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



