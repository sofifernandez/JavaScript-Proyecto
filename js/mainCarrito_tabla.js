//Obtener el carrito almacenado
let carrito = JSON.parse(localStorage.getItem("carrito"));
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

// Al cargar la página imprimir carrito, si hay elementos
document.addEventListener('DOMContentLoaded', () => {
    $('#divCarrito').addClass('d-none');
    printCarrito();
})

function printCarrito() {
    if (carrito != null) {
        document.querySelector('h3').style.color = '#595959'
        $('#noItems').addClass('d-none');
        $('#divCarrito').removeClass('d-none');

        updateCarrito();

        //Botones vaciar y seguir comprando
        $('#vaciar').append(`
        <button class= 'mt-5 col-6 col-sm-4 btnVaciar'><a href=''> Vaciar carrito</a></button>
        <button class= 'mt-5 col-6 col-sm-5 btnSeguirComprando'><a href="index.html">Seguir comprando</a></button>
        `)
        $('.btnVaciar').click((e) => {
            e.preventDefault();
            Swal.fire({ 
                html: `¿Estás seguro/a que deseas vaciar el carrito de compras?`,
                showDenyButton: true,
                confirmButtonText: 'Sí',
                denyButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) { //Confirmar eliminar
                    localStorage.clear();
                    window.location = "index.html";        
        
                } else if (result.isDenied) { // No eliminar
                    updateCarrito();
                }
            })
            $(this).children('a').attr('href', 'index.html')
        })

        $('.btnVolver').click(() => {
            window.location = "index.html";
        })


    } else {
        document.querySelector('h3').style.opacity = 0.7;
    }
}

function updateCarrito() {
    $('#tablaBody').empty();
    totalPagar = [];
    for (item of carrito) {
        totalPagar.push(item.precio * item.cantidad);
        $('#tablaBody').append(`
        
                                <tr id=${item.id}>
                                    <td class="cart_product_img">
                                        <img src=${item.imagen} alt="Product" class="img-fluid">
                                    </td>
                                    <td class="cart_product_name">
                                        <p class='mb-0'>${item.nombre}</p>
                                    </td>
                                    <td class="cart_product_price">
                                        <p class='mb-0'>$${item.precio}</p>
                                    </td>
                                    <td class="cart_product_qnty" id="qnty-${item.id}">
                                        <p class='mb-0'>${item.cantidad}</p>
                                        <button class="btn btn-info btn-sm botonAccion mb-1 fs-5" id='accionAgregar'>
                                            +
                                        </button>
                                        <button class="btn btn-danger btn-sm botonAccion mb-1 fs-5" id='accionRestar'>
                                            -
                                        </button>
                                    </td>
                                    <td class="cart_product_qnty" id="qnty-${item.id}">
                                        <p class='mb-0 fs-6' id='talleSeleccionado'>${item.talle}</p>
                                        
                                        <button class="btn btn-secondary dropdown-toggle px-1 py-1 fs-6" type="button" id="dropdownCambiar" data-bs-toggle="dropdown" aria-expanded="false">Cambiar</button>
                                        <ul class="dropdown-menu menuTalles" aria-labelledby="dropdownCambiar">
                                            <li><a class="dropdown-item"><b>4</b> <span style="font-size:80%">(14,9 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>5</b> <span style="font-size:80%">(15,6 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>6</b> <span style="font-size:80%">(16,5 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>7</b> <span style="font-size:80%">(17,2 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>8</b> <span style="font-size:80%">(18,0 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>9</b> <span style="font-size:80%">(18,9 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>10</b> <span style="font-size:80%">(19,7 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>11</b> <span style="font-size:80%">(20,6 mm)</span></a></li>
                                            <li><a class="dropdown-item"><b>12</b> <span style="font-size:80%">(21,5 mm)</span></a></li>
                                        </ul>
            
        
                                    </td>
                                    <td>
                                        <p></p>
                                        <button class="btn btn-danger btn-sm botonAccion mb-0 fs-6" id='accionEliminar'>
                                        <i class="far fa-trash-alt"></i>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            
                            `)

    }

    // Botones agregar, restar, eliminar
    $('.botonAccion').click((e) => accionesBotones(e));
    //Cambiar el talle
    $('.menuTalles li').on('click', function () {
        $(this).parent().siblings('#talleSeleccionado').text($(this).text())
    });

    // Sección del total de compras
    const total = totalPagar.reduce((a, b) => a + b, 0)
    const IVA = total * 0.22
    const subtotal = total - IVA
    $('#totalPagar').empty();
    $('#totalPagar').append(`
        <div class="cart-summary pt-3">
            <p class="text-center mb-4 fs-3">Final</p>
            <ul class="summary-table px-2">
                <li class="mb-4"><span class='fs-5'><b>Subtotal:</b></span> <span class='fs-5'>$${subtotal}</span></li>
                <li class="mb-4"><span class='fs-5'><b>IVA:</b></span> <span class='fs-5'>$${IVA}</span></li>
                    <hr>
                <li class="mb-4"><span class='fs-5'><b>Total:</b></span> <span class='fs-5'>$${total}</span></li>
            </ul>
            <div class="cart-btn mt-100">
                <button class= 'mt-5 col-7 col-lg-5 btnCheckout mb-1 fs-4'>Checkout</button>
            </div>
        </div>
    `)
    $('.btnCheckout').click((e) => accionCheckout());
}


const accionesBotones = e => {
    let ID = e.target.parentNode.parentNode.id
    let objIndex = carrito.findIndex((obj => obj.id == ID))

    // Agregar
    if (e.target.id == 'accionAgregar') {
        carrito[objIndex].cantidad++
        updateCarrito();

        //Restar
    } else if (e.target.id == 'accionRestar') {
        carrito[objIndex].cantidad--
        if (carrito[objIndex].cantidad === 0) {
            alertaBorrar(objIndex, ID)
        } else {
            updateCarrito();
        }

        // Eliminar
    } else if (e.target.id == 'accionEliminar') {
        alertaBorrar(objIndex, ID)
    }

    guardarLocal("carrito", JSON.stringify(carrito));
    e.stopPropagation()
}




const accionCheckout = () => { // Confirmar compra y borrar todo el carrito
    localStorage.clear();
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu compra!',
        showConfirmButton: false,
        timer: 1500
    })
    window.setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
}

const alertaBorrar = (objIndex, ID) => { // Borrar artículo y ver si el carrito queda vacío
    Swal.fire({ // Sweet Alert
        html: `¿Estás seguro/a que deseas eliminar ${carrito[objIndex].nombre} del carrito de compras?`,
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) { //Confirmar eliminar
            carrito = carrito.filter(el => el.id !== ID)
            guardarLocal("carrito", JSON.stringify(carrito));

            // Si el carrito queda vacío, borrar todo y recargar la página
            if (carrito == null || carrito.length == 0) {
                localStorage.clear();
                location.reload(true);
            } else {
                updateCarrito();
            }


        } else if (result.isDenied) { // No eliminar
            carrito[objIndex].cantidad++
            updateCarrito();
        }
    })

}

