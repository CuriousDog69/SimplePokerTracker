document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const playerInput = document.getElementById("playerInput");
  const playerList = document.getElementById("playerList");

  // Load saved players from localStorage
  function loadPlayers() {
    const saved = localStorage.getItem("players");
    if (!saved) return [];
    try {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) return arr;
    } catch (e) {
      console.error("Failed to parse players from localStorage", e);
    }
    return [];
  }

  // Save an array of player names to localStorage
  function savePlayers(arr) {
    localStorage.setItem("players", JSON.stringify(arr));
  }

  // Render the list (clear + re-add from array)
  function renderList(players) {
    playerList.innerHTML = "";
    players.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");

      removeBtn.addEventListener("click", () => {
        players = players.filter((n) => n !== name);
        savePlayers(players);
        renderList(players);
      });

      li.appendChild(removeBtn);
      playerList.appendChild(li);
    });
  }

  // Add a new player
  function addPlayer() {
    let name = playerInput.value.trim();
    if (name === "") return;
    let players = loadPlayers();
    // Optionally, avoid duplicates:
    if (players.includes(name)) {
      alert("Player already exists");
      playerInput.value = "";
      return;
    }
    players.push(name);
    savePlayers(players);
    renderList(players);
    playerInput.value = "";
    playerInput.focus();
  }

  // Initialize
  const players = loadPlayers();
  renderList(players);

  addBtn.addEventListener("click", addPlayer);
  playerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addPlayer();
  });
});
