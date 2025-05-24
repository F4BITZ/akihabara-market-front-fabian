const api = 'https://akihabara-market-fabian.onrender.com/productos';

function cargarProductos() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('productTableBody');
            tbody.innerHTML = '';
            data.forEach(p => {
                tbody.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${p.precio}</td>
            <td>${p.stock}</td>
            <td>
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm btn-info text-dark fw-semibold" onclick='editar(${JSON.stringify(p)})'>Editar</button>
                    <button class="btn btn-sm btn-danger" onclick='borrar(${p.id})'>Eliminar</button>
                </div>
            </td>


          </tr>`;
            });
        });
}

function editar(producto) {
    document.getElementById('productId').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
}

function borrar(id) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        fetch(`${api}/${id}`, { method: 'DELETE' })
            .then(() => cargarProductos());
    }
}

document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const producto = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${api}/${id}` : api;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(() => {
            this.reset();
            cargarProductos();
        });
});

cargarProductos();
