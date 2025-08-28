// Datos de jugadores en tendencia
const playersData = [
  {
    name: "Aaron Judge",
    team: "New York Yankees",
    position: "OF",
    image: "img/aaron.jpeg",
    stats: {
      AVG: "..323",
      HR: "41",
      RBI: "95",
    },
    profileUrl: "https://www.mlb.com/es/player/aaron-judge-592450",
  },
  {
    name: "Vladimir Guerrero Jr.",
    team: "Toronto Blue Jays",
    position: "1B",
    image: "img/vladijr.jpeg",
    stats: {
      AVG: ".294",
      HR: "21",
      RBI: "72",
    },
    profileUrl: "https://www.mlb.com/es/player/vladimir-guerrero-jr-665489",
  },
  {
    name: "Fernando Tatis Jr.",
    team: "San Diego Padres",
    position: "Rf",
    image: "img/tatis.jpeg",
    stats: {
      AVG: ".264",
      HR: "18",
      RBI: "55",
    },
    profileUrl: "https://www.mlb.com/es/player/fernando-tatis-jr-665487",
  },
  {
    name: "Mookie Betts",
    team: "Los Angeles Dodgers",
    position: "OF",
    image: "img/mokie.jpeg",
    stats: {
      AVG: ".248",
      HR: "14",
      RBI: "58",
    },
    profileUrl: "https://www.mlb.com/es/player/mookie-betts-605141",
  },
  {
    name: "Ronald Acuña Jr.",
    team: "Atlanta Braves",
    position: "OF",
    image: "img/acuna.jpeg",
    stats: {
      AVG: ".301",
      HR: "15",
      RBI: "31",
    },
    profileUrl: "https://www.mlb.com/es/player/ronald-acuna-jr-660670",
  },
  {
    name: "Mike Trout",
    team: "Los Angeles Angels",
    position: "OF",
    image: "img/trout.jpeg",
    stats: {
      AVG: ".235",
      HR: "20",
      RBI: "52",
    },
    profileUrl: "https://www.mlb.com/es/player/mike-trout-545361",
  },
  {
    name: "Shohei Ohtani",
    team: "Los Angeles Dodgers",
    position: "DH/P",
    image: "img/shohei.webp",
    stats: {
      AVG: ".273",
      HR: "45",
      RBI: "85",
    },
    profileUrl: "https://www.mlb.com/es/player/shohei-ohtani-660271",
  },
  {
    name: "Kyle Schwarber",
    team: "Houston Astros",
    position: "OF",
    image: "img/kyle.jpeg",
    stats: {
      AVG: ".244",
      HR: "45",
      RBI: "110",
    },
    profileUrl: "https://www.mlb.com/es/player/kyle-schwarber-656941",
  },
  {
    name: "José Altuve",
    team: "Houston Astros",
    position: "2B",
    image: "img/altuve.jpeg",
    stats: {
      AVG: ".273",
      HR: "22",
      RBI: "64",
    },
    profileUrl: "https://www.mlb.com/es/player/jose-altuve-514888",
  },
  {
    name: "Freddie Freeman",
    team: "Los Angeles Dodgers",
    position: "1B",
    image: "img/freddy.jpeg",
    stats: {
      AVG: ".302",
      HR: "18",
      RBI: "75",
    },
    profileUrl: "https://www.mlb.com/es/player/freddie-freeman-518692",
  },
  {
    name: "Juan Soto",
    team: "New York Yankees",
    position: "OF",
    image: "img/soto.jpeg",
    stats: {
      AVG: ".250",
      HR: "32",
      RBI: "78",
    },
    profileUrl: "https://www.mlb.com/es/player/juan-soto-665742",
  },
  {
    name: "Junior Caminero",
    team: "Tampa Bay Rays",
    position: "3B",
    image: "img/caminero.jpeg",
    stats: {
      AVG: ".257",
      HR: "39",
      RBI: "94",
    },
    profileUrl: "https://www.mlb.com/es/player/junior-caminero-691406",
  },
];

// Función para crear una card de jugador
function createPlayerCard(player) {
  // Crear las estadísticas HTML
  const statsHTML = Object.entries(player.stats)
    .map(
      ([key, value]) =>
        `<div class="stat-item">
            <span class="stat-label">${key}:</span>
            <span class="stat-value">${value}</span>
        </div>`
    )
    .join("");

  // Retornar el HTML completo de la card
  return `
        <div class="player-card">
            <img src="${player.image}" 
                 alt="${player.name}" 
                 class="player-image" 
                 onerror="this.src='img/mlb.jpeg'">
            <h3 class="player-name">${player.name}</h3>
            <p class="player-team">${player.team}</p>
            <p class="player-position">${player.position}</p>
            <div class="player-stats">
                ${statsHTML}
            </div>
            <a target="_blank" href="${player.profileUrl}" class="profile-btn">Ver Perfil</a>
        </div>
    `;
}

// Función para cargar todos los jugadores
function loadPlayers() {
  const loading = document.getElementById("players-loading");
  const container = document.getElementById("players-container");

  // Mostrar loading inicialmente
  loading.style.display = "block";
  container.style.display = "none";

  // Simular tiempo de carga (puedes ajustar o quitar este setTimeout)
  setTimeout(() => {
    try {
      // Ocultar el loading
      loading.style.display = "none";

      // Generar HTML de todas las cards
      const playersHTML = playersData.map(createPlayerCard).join("");
      container.innerHTML = playersHTML;

      // Mostrar el grid
      container.style.display = "grid";

      // Animar la aparición de las cards una por una
      animateCards();
    } catch (error) {
      console.error("Error cargando jugadores:", error);
      showErrorMessage();
    }
  }, 1500); // 1.5 segundos de carga
}

// Función para animar la aparición de las cards
function animateCards() {
  const cards = document.querySelectorAll(".player-card");

  cards.forEach((card, index) => {
    // Iniciar invisible y desplazada hacia abajo
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    // Animar cada card con un pequeño retraso
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150); // 150ms de retraso entre cada card
  });
}

// Función para mostrar mensaje de error
function showErrorMessage() {
  const loading = document.getElementById("players-loading");
  const container = document.getElementById("players-container");

  loading.innerHTML = `
        <div style="color: #e74c3c; font-size: 1.1rem;">
            ❌ Error al cargar los jugadores. 
            <button onclick="loadPlayers()" style="
                background: #e74c3c; 
                color: white; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 5px; 
                margin-left: 10px; 
                cursor: pointer;
            ">Reintentar</button>
        </div>
    `;
}

// Función para actualizar un enlace de perfil específico
function updatePlayerProfile(playerName, newUrl) {
  const player = playersData.find((p) => p.name === playerName);
  if (player) {
    player.profileUrl = newUrl;
    console.log(`Perfil actualizado para ${playerName}: ${newUrl}`);
  }
}

// Función para agregar un nuevo jugador
function addPlayer(newPlayer) {
  playersData.push(newPlayer);
  console.log("Nuevo jugador agregado:", newPlayer.name);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  console.log("Iniciando carga de jugadores...");
  loadPlayers();
});

// También cargar si la página ya está cargada
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPlayers);
} else {
  loadPlayers();
}
