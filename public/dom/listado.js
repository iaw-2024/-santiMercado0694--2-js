document.addEventListener('DOMContentLoaded', () => {

    const url = './product.json';
    const listadoContainer = document.getElementById('listado');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                const elemento = document.createElement('div');
                elemento.classList.add('elemento');

                const imagen = document.createElement('img');
                imagen.src = producto.imagen;
                imagen.alt = producto.nombre;

                const titulo = document.createElement('h3');
                titulo.textContent = producto.nombre;

                const precio = document.createElement('p');
                precio.textContent = producto.precio;

                elemento.appendChild(imagen);
                elemento.appendChild(titulo);
                elemento.appendChild(precio);

                listadoContainer.appendChild(elemento);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
