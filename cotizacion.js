document.addEventListener('DOMContentLoaded', () => {
    const dynamicForm = document.getElementById('dynamicForm');
    const addProductBtn = document.getElementById('addProduct');
    const container = document.getElementById('productosContainer');

    // Agregar filas de productos
    addProductBtn.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'producto-row';
        row.innerHTML = `
            <select name="producto[]" required>
                <option value="Cartón Corrugado">Cartón Corrugado</option>
                <option value="Soga Polipropileno">Soga Polipropileno</option>
                <option value="Guantes de Nitrilo">Guantes de Nitrilo</option>
                <option value="Cinta de Embalaje">Cinta de Embalaje</option>
            </select>
            <input type="number" name="cantidad[]" placeholder="Cant." min="1" required>
        `;
        container.appendChild(row);
    });

    // Enviar a WhatsApp
    dynamicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const telefono = "573155167475"; // Tu número
        const nombre = document.getElementById('nombre').value;
        const mensajeExtra = document.getElementById('mensaje').value;
        
        let productosTexto = "";
        const productos = document.querySelectorAll('[name="producto[]"]');
        const cantidades = document.querySelectorAll('[name="cantidad[]"]');

        productos.forEach((p, i) => {
            if(p.value) productosTexto += `%0A- ${p.value} (${cantidades[i].value} unidades)`;
        });

        const textoFinal = `*Nueva Cotización - Grupo Buissa*%0A%0A*Cliente:* ${nombre}${productosTexto}%0A%0A*Notas:* ${mensajeExtra}`;
        
        const url = `https://wa.me/${telefono}?text=${textoFinal}`;
        window.open(url, '_blank');
    });
});