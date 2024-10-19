// Constante de la velocidad de la luz en metros por segundo
const c = 299792458;

// Inicializa el tiempo transcurrido en el marco estacionario
let startTime = Date.now(); // En milisegundos

function calculateTimeDilation(speed, deltaTime) {
    // Calcula el tiempo dilatado
    if (speed >= c) {
        return "Infinito"; // No es posible viajar a la velocidad de la luz
    } else {
        return deltaTime / Math.sqrt(1 - (speed ** 2 / c ** 2));
    }
}

function updateInfo(speed) {
    // Tiempo real transcurrido (en segundos)
    const currentTime = Date.now();
    const deltaTime = (currentTime - startTime) / 1000; // Convertimos a segundos

    // Calcula la dilatación del tiempo
    const dilatedTime = calculateTimeDilation(speed, deltaTime);

    // Actualiza los valores en la página
    const speedElement = document.getElementById('speed');
    const deltaTimeElement = document.getElementById('deltaTime');
    const dilatationElement = document.getElementById('dilatation');
    
    speedElement.textContent = speed.toFixed(2) + " m/s";
    deltaTimeElement.textContent = deltaTime.toFixed(6) + " s";
    dilatationElement.textContent = dilatedTime.toFixed(6) + " s";  // Mostrar con 6 decimales
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const speed = position.coords.speed || 0; // Velocidad en m/s
        updateInfo(speed);
    }, (error) => {
        console.error(error);
        alert('No se pudo obtener la geolocalización');
    }, {
        enableHighAccuracy: true
    });
} else {
    alert("Geolocalización no soportada por este navegador.");
}
