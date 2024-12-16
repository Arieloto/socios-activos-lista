// JavaScript
fetch('listasocios2024.json')
.then(response => response.json())
.then(data => {
    const cardContainer = document.getElementById('card-container');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-button');

    // Función para crear y agregar tarjetas
    const addCards = (socios) => {
        socios.forEach(socio => {
            // Crear contenedor para la tarjeta
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('card');
            
            // Generar el HTML de la tarjeta
            cardWrapper.innerHTML = `
                <!-- Front Side -->
                <p class="logotext">Club Nacional de Tiro N° 69 <br> 
                    Almirante Blanco Encalada Olmue</p>
                <div class="front">
                    <div class="left-section">
                        <img src="${socio.UrlFotos}" alt="Foto" class="profile-photo">
                        <p class="name">${socio.Nombre1} ${socio.Apellido1}</p>
                    </div>
                    <div class="right-section">
                        <img src="Escudo Nuevo.png" alt="Logo del Club" class="logo">      
                        <p class="info">N° Socio: ${socio.NumSocio}</p>
                        <p class="info">Rut: ${socio.RUT}</p>
                        <p class="info">Validez: 12/2025</p>
                    </div>
                </div>
                <!-- Back Side -->
                <div class="back">
                    <h2 class="title">CREDENCIAL PERSONAL E INSTRANSFERIBLE</h2>
                    <img src="Escudo Nuevo.png" alt="Reglamento" class="rules-image">
                </div>
            `;
            
            // Agregar tarjeta al contenedor
            cardContainer.appendChild(cardWrapper);
        });
    };

    // Función para filtrar los socios
    const filterSocios = (searchTerm) => {
        return data.ClubIntegrantes.filter(socio => {
            const fullName = `${socio.Nombre1} ${socio.Apellido1}`.toLowerCase();
            const numSocio = socio.NumSocio.toString().toLowerCase();
            const rut = socio.RUT.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase()) || numSocio.includes(searchTerm.toLowerCase()) || rut.includes(searchTerm.toLowerCase());
        });
    };

    // Función para manejar la búsqueda
    const handleSearch = () => {
        const searchTerm = searchBar.value.trim(); // Eliminar espacios innecesarios

        if (searchTerm === '') {
            // Si el término de búsqueda está vacío, no realizar ninguna acción
            return;
        }

        // Filtrar y agregar las tarjetas
        const filteredSocios = filterSocios(searchTerm);
        addCards(filteredSocios);
    };

    // Función para reiniciar la pantalla
    const resetScreen = () => {
        cardContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas
        searchBar.value = '';         // Vaciar el campo de búsqueda
    };

    // Asociar eventos
    searchButton.addEventListener('click', handleSearch); // Botón de búsqueda
    resetButton.addEventListener('click', resetScreen);   // Botón de reinicio

    // También permitir búsqueda con "Enter" en el campo de texto
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
})
.catch(error => console.error('Error al cargar los datos:', error));
