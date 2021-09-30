// Suscripciones---------------------------------------------------------------
$('#btnSuscription').click((e) => {
    e.preventDefault();
    let email = $('#emailSusc').val();
    let form = e.target.parentNode.parentNode.querySelector('form')
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        sendMess(form);
        $('#formSusc').trigger("reset");
        Swal.fire({
            icon: 'success',
            title: 'Suscripción exitosa',
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa un mail válido',
        })
    }
})


//Enviar Mensaje-----------------------------------------------------------------------------
$('#enviarMens').click((e) => {
    e.preventDefault();
    let email = $('#emailContacto').val()
    let nombre= $('#nombre').val()
    let mensaje= $('#mensaje').val()
    let form = e.target.parentNode.parentNode.querySelector('form')
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let nameFormat= /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let messFormat = /^.{1,255}$/;
    if (email.match(mailFormat) && nombre.match(nameFormat) && mensaje.match(messFormat)) {
        sendMess(form);
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            showConfirmButton: false,
            timer: 1500
        });;
        $('#formMensaje').trigger("reset");
    }
    else if (!email.match(mailFormat)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa un mail válido',
        });
    }

    else if (!nombre.match(nameFormat)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa un nombre válido',
        });
    }
    else if (!mensaje.match(messFormat)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor escribe hasta 250 caracteres',
        });
    }
})


function sendMess(formulario) {
    fetch("https://formsubmit.co/ajax/sofiafernandez03@gmail.com", { method: "POST", body: new FormData(formulario) })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            console.log(json)
        })
        .catch(err => {
            console.log(err)
        })
}