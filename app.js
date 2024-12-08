// Añadir estilos mediante JavaScript con clases personalizadas
const style = document.createElement('style');
style.textContent = `
    /* Estilos personalizados para la tabla */
    .tabla-socios {
        width: 100%;
        border-collapse: collapse;
        margin: 50px 0;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
    }

    /* Estilo para las celdas */
    .tabla-socios th, .tabla-socios td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    /* Estilo para los encabezados */
    .tabla-socios th {
        background-color: #4CAF50;
        color: Darkblue;
    }

    /* Estilo para las filas alternas */
    .tabla-socios tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    /* Estilo para la imagen en las celdas */
    .tabla-socios td img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    /* Estilo para la tabla cuando se pasa el mouse por encima */
    .tabla-socios tr:hover {
        background-color: #ddd;
    }

    /* Estilo personalizado para la fila */
    .fila-socio {
        transition: background-color 0.3s;
    }

    /* Estilo para la celda de nombre completo */
    .celda-nombre {
        font-weight: bold;
    }

    /* Estilo para la celda de foto */
    .celda-foto {
        text-align: center;
    }
`;
document.head.appendChild(style);

// Fetch los datos del archivo JSON
fetch('listasocios2024.json')
    .then(response => response.json())
    .then(data => {
        // Seleccionamos el cuerpo de la tabla donde se insertarán los datos
        const cuerpoTabla = document.getElementById('cuerpo-tabla');
        
        // Creamos la tabla con la clase personalizada
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-socios');
        
        // Añadimos los encabezados de la tabla
        const thead = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        encabezadoFila.innerHTML = `
            <th>Nombre Completo</th>
            <th>Fecha de Ingreso</th>
            <th>N° Socio</th>
            <th>RUT</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Foto</th>
        `;
        thead.appendChild(encabezadoFila);
        tabla.appendChild(thead);
        
        // Iteramos sobre los datos de los socios y creamos las filas de la tabla
        const tbody = document.createElement('tbody');
        data.ClubIntegrantes.forEach(socio => {
            // Creamos una nueva fila con la clase personalizada
            const fila = document.createElement('tr');
            fila.classList.add('fila-socio');
            
            // Creamos las celdas para cada dato con clases personalizadas
            const nombreCompleto = document.createElement('td');
            nombreCompleto.classList.add('celda-nombre');
            nombreCompleto.textContent = `${socio.Nombre1} ${socio.Nombre2} ${socio.Apellido1} ${socio.Apellido2}`;
            
            const fechaIngreso = document.createElement('td');
            fechaIngreso.textContent = socio.FechaIngreso;

            const numeroSocio = document.createElement('td');
            numeroSocio.textContent = socio.NumSocio;
            
            const rut = document.createElement('td');
            rut.textContent = socio.RUT;
            
            const telefono = document.createElement('td');
            telefono.textContent = socio.Fono;
            
            const correo = document.createElement('td');
            correo.textContent = socio.Email;
            
            const direccion = document.createElement('td');
            direccion.textContent = socio.Direccion;
            
            const foto = document.createElement('td');
            foto.classList.add('celda-foto');
            const imagen = document.createElement('img');
            imagen.src = socio.UrlFotos;
            imagen.alt = `${socio.Nombre1} ${socio.Apellido1}`;
            foto.appendChild(imagen);
            
            // Añadimos las celdas a la fila
            fila.appendChild(nombreCompleto);
            fila.appendChild(fechaIngreso);
            fila.appendChild(numeroSocio);
            fila.appendChild(rut);
            fila.appendChild(telefono);
            fila.appendChild(correo);
            fila.appendChild(direccion);
            fila.appendChild(foto);
            
            // Añadimos la fila al cuerpo de la tabla
            tbody.appendChild(fila);
        });
        
        // Añadimos el cuerpo de la tabla al elemento principal
        tabla.appendChild(tbody);
        cuerpoTabla.appendChild(tabla);
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });
