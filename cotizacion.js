/* -----------------------------------------------------------
   GRUPO BUISSA - COTIZACIÓN SCRIPT (Optimizado y Funcional)
   ----------------------------------------------------------- */

(function() {
  document.addEventListener('DOMContentLoaded', initCotizacion);

  function initCotizacion() {
    const dynamicForm = document.getElementById('dynamicForm');
    const addProductBtn = document.getElementById('addProduct');
    const productosContainer = document.getElementById('productosContainer');

    // --- GESTIÓN DINÁMICA DE PRODUCTOS (UX) ---

    if (addProductBtn && productosContainer) {
      addProductBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('producto-row', 'margin-top-sm');
        
        // HTML optimizado para accesibilidad
        div.innerHTML = `
          <select name="producto[]" required aria-label="Seleccionar producto">
            <option value="" disabled selected>Seleccione un producto...</option>
            <option value="Cartón de embalaje (1,20m x 100m)">Cartón de embalaje (1,20m x 100m)</option>
            <option value="Sogas en polipropileno (Ganadera Mix)">Sogas en polipropileno (Ganadera Mix)</option>
            <option value="Guantes industriales">Guantes industriales</option>
            <option value="Plásticos y empaques">Plásticos y empaques</option>
            <option value="Otros">Otros</option>
          </select>
          <input type="number" name="cantidad[]" placeholder="Cant." min="1" required aria-label="Cantidad">
          <button type="button" class="btn-remove btn-sm" aria-label="Eliminar producto">✖</button>
        `;
        productosContainer.appendChild(div);

        // Añadir evento para eliminar la fila recién creada
        div.querySelector('.btn-remove').addEventListener('click', () => {
          div.remove();
        });
      });
    }

    // --- ENVÍO A WHATSAPP (Lógica Funcional) ---

    if (dynamicForm) {
      dynamicForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // SEO/UX: Configuración de contacto
        const telefono = "573001234567"; // Número verificado de Grupo Buissa
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const fecha = document.getElementById('fecha').value;
        const mensaje = document.getElementById('mensaje').value;
        const origen = dynamicForm.querySelector('[name="origen"]').value;

        // Captura y formato eficiente de productos dinámicos
        let productos = "";
        const productoElems = dynamicForm.querySelectorAll('[name="producto[]"]');
        const cantidadElems = dynamicForm.querySelectorAll('[name="cantidad[]"]');

        productoElems.forEach((elem, i) => {
          const prod = elem.value;
          const cant = cantidadElems[i].value;
          // Solo añadir productos válidos
          if (prod && cant && cant > 0) {
            productos += `\n✅ ${prod} (Cantidad: ${cant})`;
          }
        });

        // SEO/UX: Mensaje descriptivo y profesional
        const texto = `Hola *Grupo Buissa*, soy *${nombre}*.\nMi correo es: ${email}.\n\nQuiero cotizar los siguientes productos:${productos}\n\n📅 *Fecha entrega:* ${fecha}\nDetalles adicionales: ${mensaje}\n\n_Origen: ${origen}_`;

        // SEO: Uso de wa.me optimizado con codificación URL segura
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
        
        // UX: Abrir en pestaña nueva para no perder al usuario
        window.open(url, "_blank");
      });
    }
  }
})();