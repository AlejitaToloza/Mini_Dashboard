// Datos ficticios para el dashboard
const membersCount = 150; // Número total de miembros
const messages = [
    "[Adriana]: ¡Hola a todos!",
    "[Adriana]: ¿Cómo están?",
    "[Adriana]: No olviden revisar las reglas.",
    "[Diego 🎮]: ¿Alguien quiere jugar?",
    "[😽Laura]: ¡Feliz cumpleaños a Juan! 🥳🎈"
]; 

// Estado de los administradores
const adminsStatus = [
    { name: "Admin1", status: "Conectado" },
    { name: "Admin2", status: "Desconectado" }
]; 

let messageCount = 0; // Contador de mensajes
let messageInterval; // Variable para almacenar el intervalo de mensajes

// Función para mostrar mensajes con efecto de aparición secuencial
function showMessages() {
    const messagesList = document.getElementById('messages-list');
    messagesList.innerHTML = ''; // Limpiar la lista antes de mostrar nuevos mensajes
    let index = 0;

    // Reiniciar el contador de mensajes al comenzar
    messageCount = 0; 

    const showNextMessage = () => {
        if (index < messages.length) {
            // Crear un elemento li para el mensaje
            const li = document.createElement('li');
            li.textContent = messages[index];
            li.classList.add('popup-message'); // Agregar clase para el efecto de pop-up
            messagesList.appendChild(li); // Agregar el li a la lista
            
            // Incrementar el contador de mensajes
            messageCount++;
            document.getElementById('message-count').textContent = `Total de mensajes: ${messageCount}`;
            
            index++; // Incrementar el índice
            messageInterval = setTimeout(showNextMessage, 2000); // Esperar 2 segundos antes de mostrar el siguiente
        } else {
            // Reiniciar el índice después de mostrar todos los mensajes
            index = 0; // Reiniciar el índice
            setTimeout(showMessages, 2000); // Esperar 2 segundos antes de reiniciar el ciclo
        }
    };

    showNextMessage(); // Iniciar la secuencia de mensajes
}

// Función para actualizar la información en el dashboard
function updateDashboard() {
    document.getElementById('member-count').textContent = `${membersCount}`;
    
    // Detener el ciclo de mensajes si está en ejecución
    clearTimeout(messageInterval); // Limpiar el intervalo de mensajes
    showMessages(); // Mostrar mensajes

    const adminsStatusList = document.getElementById('admins-status');
    adminsStatusList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos estados
    adminsStatus.forEach(admin => {
        const li = document.createElement('li');
        li.textContent = `${admin.name}: `;
        
        // Crear un span para el estado
        const statusSpan = document.createElement('span');
        statusSpan.textContent = admin.status;
        
        // Agregar la clase correspondiente según el estado
        statusSpan.classList.add(admin.status === "Conectado" ? 'status-conectado' : 'status-desconectado');
        
        li.appendChild(statusSpan); // Agregar el span al li
        adminsStatusList.appendChild(li); // Agregar el li a la lista
    });
}

// Función para cambiar entre modo oscuro y claro
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const button = document.getElementById('toggle-mode');
    button.textContent = document.body.classList.contains('dark') ? '🌞 Cambiar a Modo Claro' : '🌚 Cambiar a Modo Oscuro';
}

// Evento para actualizar datos
document.getElementById('refresh-data').addEventListener('click', updateDashboard);

// Evento para cambiar entre modos
document.getElementById('toggle-mode').addEventListener('click', toggleDarkMode);

// Inicializar el dashboard al cargar
updateDashboard();

// Datos de ejemplo para la actividad del servidor
const activityData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], // Etiquetas para los días de la semana
    datasets: [{
        label: 'Actividad del Servidor',
        data: [12, 19, 3, 5, 2, 3, 15], // Datos de la actividad
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
        borderWidth: 1 // Ancho del borde
    }]
};

// Configuración del gráfico
const config = {
    type: 'bar', // Tipo de gráfico
    data: activityData,
    options: {
        scales: {
            y: {
                beginAtZero: true // Comenzar el eje Y desde cero
            }
        }
    }
};

// Crear el gráfico
const activityChart = new Chart(
    document.getElementById('activityChart'),
    config
);
