document.addEventListener('DOMContentLoaded', () => {
    const cities = ["Armenia", "Barranquilla", "Bogotá", "Bucaramanga", "Cali", "Cartagena", "Cúcuta", "Leticia", "Medellín", "Montería", "Pereira", "Riohacha", "San Andrés", "Santa Marta"];
    
    // Código para el selector de ciudades con filtrado
    const setupCityDropdown = (inputId, dropdownId) => {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        const dropdownContent = dropdown;

        const filterCities = () => {
            const filter = input.value.toLowerCase();
            dropdownContent.innerHTML = '';
            const filteredCities = cities.filter(city => city.toLowerCase().startsWith(filter));
            filteredCities.forEach(city => {
                const div = document.createElement('div');
                div.textContent = city;
                div.onclick = () => {
                    input.value = city;
                    dropdown.style.display = 'none';
                };
                dropdownContent.appendChild(div);
            });
            dropdown.style.display = filteredCities.length ? 'block' : 'none';
        };

        // Mostrar desplegable al hacer clic en el input
        input.addEventListener('click', () => {
            filterCities();
        });

        // Filtrar ciudades mientras se escribe
        input.addEventListener('input', () => {
            filterCities();
        });

        // Ocultar desplegable si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    };

    setupCityDropdown('city-input', 'city-dropdown');
    setupCityDropdown('destination-input', 'destination-dropdown');

    // Código para el selector de pasajeros
    const setupPassengerDropdown = (inputId, dropdownId) => {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        const dropdownContent = dropdown;

        const passengers = Array.from({ length: 9 }, (_, i) => i + 1); // Genera números del 1 al 9

        const showPassengerDropdown = () => {
            dropdownContent.innerHTML = '';
            passengers.forEach(num => {
                const div = document.createElement('div');
                div.textContent = num;
                div.onclick = () => {
                    input.value = num;
                    dropdown.style.display = 'none';
                };
                dropdownContent.appendChild(div);
            });
            dropdown.style.display = 'block';
        };

        // Mostrar desplegable al hacer clic en el input
        input.addEventListener('click', showPassengerDropdown);

        // Ocultar desplegable si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    };

    setupPassengerDropdown('passenger-input', 'passenger-dropdown');

    // Deshabilitar fecha de vuelta cuando esté activado la opción de solo ida
    const tipoViajeRadios = document.querySelectorAll('input[name="tipo-viaje"]');
    const dateReturnField = document.querySelector('#date-return').closest('.campo'); // Asumiendo que la fecha de vuelta está en un contenedor con clase 'campo'
    const dateReturnInput = document.getElementById('date-return');

    const updateReturnDateVisibility = () => {
        const selectedType = document.querySelector('input[name="tipo-viaje"]:checked').value;
        if (selectedType === 'solo-ida') {
            dateReturnField.style.display = 'none'; // Oculta el campo de vuelta
            dateReturnInput.value = ''; // Limpia el campo si está oculto
        } else {
            dateReturnField.style.display = 'block'; // Muestra el campo de vuelta
        }
    };

    // Configura el estado inicial
    updateReturnDateVisibility();

    // Actualiza el estado al cambiar el tipo de viaje
    tipoViajeRadios.forEach(radio => {
        radio.addEventListener('change', updateReturnDateVisibility);
    });

    // Código para el calendario
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const dateDeparture = document.getElementById('date-departure');
    const dateReturn = document.getElementById('date-return');

    dateDeparture.setAttribute('min', formatDate(today));
    dateDeparture.setAttribute('max', formatDate(nextYear));

    dateReturn.setAttribute('min', formatDate(today));
    dateReturn.setAttribute('max', formatDate(nextYear));

    // Validación del formulario
    const validateForm = () => {
        const originInput = document.getElementById('city-input').value.trim();
        const destinationInput = document.getElementById('destination-input').value.trim();
        const dateDepartureValue = dateDeparture.value;
        const dateReturnValue = dateReturn.value;
        const tipoViaje = document.querySelector('input[name="tipo-viaje"]:checked').value;
        const passengerCount = document.getElementById('passenger-input').value;

        // Verifica que los campos no estén vacíos
        if (!originInput || !destinationInput || !dateDepartureValue || (tipoViaje === 'ida-vuelta' && !dateReturnValue) || !passengerCount) {
            alert('Por favor, complete todos los campos requeridos.');
            return false;
        }

        // Verifica que la ciudad de origen no sea la misma que la de destino
        if (originInput === destinationInput) {
            alert('La ciudad de origen no puede ser la misma que la ciudad de destino.');
            return false;
        }

        // Si es "solo-ida", no verifica la fecha de vuelta
        if (tipoViaje === 'solo-ida' && dateReturnValue) {
            alert('No se debe ingresar una fecha de vuelta si se selecciona "Solo ida".');
            return false;
        }

        // Si todo está bien
        alert('Formulario válido y listo para enviar.');
        return true;
    };

    // Configura el botón de búsqueda
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', (event) => {
        // Prevenir el envío del formulario si no es válido
        if (!validateForm()) {
            event.preventDefault();
        }
    });
});
