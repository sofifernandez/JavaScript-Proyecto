//Eventos 
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    itemsEnCarrito = JSON.parse(localStorage.getItem("itemsEnCarrito")) || [];
    hayItems();
})

// Ya hay items en el carrito?
function hayItems() {
    if (itemsEnCarrito != 0) {
        $('#lblCartCount').text(`${itemsEnCarrito}`).show();
        $('#lblCartCountDrop').text(`${itemsEnCarrito}`).show();
    }
}


// Traer productos
const fetchData = async () => {
    const res = await fetch('productos.json');
    const data = await res.json()
    renderCard(data);
}


const contenedorAnillos = $('#contenedorAnillos');
const contenedorAros = $('#contenedorAros');
let carrito = [];
let = itemsEnCarrito = 1;
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

// Crear las cards
const renderCard = data => {
    data.forEach(producto => {
        let content = `
    <div class="'card col-11 col-sm-6 mb-5">
        <img class="card-img-top img-fluid" src="${producto.imagen}" alt="">
        <div class="card-body col-11">
            <p class="card-text nombreProducto"><b>${producto.nombre}</b></p>
            <p class="card-text precioProducto"><b>$${producto.precio}</b></p>
        </div>
        
        <div class="col-6 dropdown mb-2 px-2">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Talle</button>
            <ul class="dropdown-menu menuTalles" aria-labelledby="dropdownMenuButton1">
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
            
        </div>
        <div class='col-6' ><a href="comprar.html#botonPasos">Guía de talles</a></div>
        <button class="col-8 justify-self-center btn-Carrito" id='btn-${producto.id}'>Agregar al carrito</button>
        
    </div>
    `
        if (producto.tipo == 'ANILLO') {
            contenedorAnillos.append(content)
        } else {
            contenedorAros.append(content)
        }

        $(`#btn-${producto.id}`).click(function (e) {
            e.preventDefault();
            agregarACarrito(e);
        });
    })

    $('.menuTalles li').on('click', function () {
        $(this).parent().siblings().text($(this).text())
    });

}



// Agregar al carrito
const agregarACarrito = e => {
    if (e.target.classList.contains('btn-Carrito')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

// Armado de carrito
const setCarrito = item => {
    // Talle. Si no seleccionó, alertar
    let talleSelect = item.querySelector('.dropdown-toggle').innerText
    if (talleSelect == 'Talle') {
        Swal.fire({
            icon: 'info',
            html:'<p><b>Por favor selecciona un talle</b></p>'+
                '<a href="comprar.html#botonPasos">(Cómo saber mi talle)</a> ' ,
            width: '20rem',

        })
    } else {
        let producto = {
            nombre: item.querySelector('.nombreProducto').textContent,
            precio: item.querySelector('.precioProducto').textContent.match(/\d/g).join(""), // solo quedarme con los números, sin el $
            id: item.querySelector('.btn-Carrito').id,
            imagen: item.querySelector('img').src,
            cantidad: 1,
            talle: talleSelect,
        }

        //Chequear duplicados y talles
        const existe = carrito.some(el => el.id === producto.id && el.talle == producto.talle); // true or false dependiendo si ya está el producto en el carrito
        // si está...
        if (existe) {
            let objIndex = carrito.findIndex((obj => obj.id == producto.id))
            carrito[objIndex].cantidad++
        } else {
            // Si no está, solo agregar este nuevo producto al carrito existente
            carrito.push(producto);
        };

        //Sweet Alert
        Swal.fire({
            icon: 'success',
            text: `Agregaste ${producto.nombre} al carrito`,
            imageUrl: `${producto.imagen}`,
            imageWidth: 100,
            imageHeight: 100,
            timer: 1300,
            showConfirmButton: false,

        })
        itemsEnCarrito++
        guardarLocal("carrito", JSON.stringify(carrito));
        guardarLocal("itemsEnCarrito", JSON.stringify(itemsEnCarrito));
        hayItems();
        $(`#${producto.id}`).css({ 'background-color': '#7B94B3' })
        

    }



}



