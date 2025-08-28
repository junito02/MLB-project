const teamsContainer = document.getElementById("teams-container");
const teamsLoading = document.getElementById("teams-loading");
const TEAMS_API = "https://statsapi.mlb.com/api/v1/teams?sportId=1";

let allTeams = [];
let showingAll = false;

// Función para obtener equipos desde la API
async function fetchTeams() {
  try {
    const response = await fetch(TEAMS_API);
    const data = await response.json();

    if (!data.teams || data.teams.length === 0) {
      teamsLoading.innerHTML = "<p>No se encontraron equipos.</p>";
      return;
    }

    allTeams = data.teams;
    teamsLoading.style.display = "none";

    // Renderizar primeros 10 equipos
    renderTeams(allTeams.slice(0, 10));

    // Crear botón "Ver más equipos" si hay más de 10
    if (allTeams.length > 10) createShowMoreButton();
  } catch (error) {
    console.error(error);
    teamsLoading.innerHTML =
      "<p>Error al cargar equipos. Intenta nuevamente.</p>";
  }
}

// Función para renderizar equipos
function renderTeams(teams) {
  if (!teamsContainer) return;

  teamsContainer.innerHTML = "";

  teams.forEach((team, index) => {
    const logoUrl = `https://www.mlbstatic.com/team-logos/${team.id}.svg`;
    const teamMLBUrl = `https://www.mlb.com/es/search?q=${encodeURIComponent(
      team.name
    )}`;

    const teamCard = document.createElement("div");
    teamCard.className = "team-card";

    teamCard.innerHTML = `
      <img src="${logoUrl}" alt="${team.name} logo" 
           onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(
             team.name
           )}'">
      <h3>${team.name}</h3>
      <div class="team-info">
        <p><strong>Abreviatura:</strong> ${team.abbreviation}</p>
        <p><strong>Ciudad:</strong> ${team.locationName}</p>
        <p><strong>Conferencia:</strong> ${team.league?.name || "N/A"}</p>
      </div>
      <a href="${teamMLBUrl}" target="_blank" class="ver-mas-btn">Ver más</a>
    `;

    setTimeout(() => teamCard.classList.add("animate"), index * 100);

    teamsContainer.appendChild(teamCard);
  });
}

// Crear botón "Ver más equipos"
function createShowMoreButton() {
  const showMoreBtn = document.createElement("button");
  showMoreBtn.textContent = "Ver más equipos";

  Object.assign(showMoreBtn.style, {
    margin: "2rem auto 0",
    display: "block",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  showMoreBtn.addEventListener(
    "mouseover",
    () => (showMoreBtn.style.transform = "scale(1.05)")
  );
  showMoreBtn.addEventListener(
    "mouseout",
    () => (showMoreBtn.style.transform = "scale(1)")
  );

  teamsContainer.parentElement.appendChild(showMoreBtn);

  showMoreBtn.addEventListener("click", () => {
    if (!showingAll) {
      renderTeams(allTeams);
      showMoreBtn.style.display = "none";
      showingAll = true;
    }
  });
}

// Inicializar
fetchTeams();
