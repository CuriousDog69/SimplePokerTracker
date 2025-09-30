document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const playerInput = document.getElementById("playerInput");
  const playerList = document.getElementById("playerList");

  // Function to add player
  function addPlayer() {
    const playerName = playerInput.value.trim();
    if (playerName === "") return;

    const li = document.createElement("li");
    li.textContent = playerName;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", () => {
      playerList.removeChild(li);
    });

    li.appendChild(removeBtn);
    playerList.appendChild(li);

    playerInput.value = "";
    playerInput.focus();
  }

  // Add button click
  addBtn.addEventListener("click", addPlayer);

  // Enter key to add player
  playerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  });
});
