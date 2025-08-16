const apiKey = "fe4914f6aef8482786060205b9228694";
const gameList = document.getElementById("game-list");

fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=100`)
  .then((response) => response.json())
  .then((data) => {
    const slideData = data.results.slice(0, 20);
    slideData.forEach((game) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="game-card" style="background-color: #1A1A1A; border: 1px solid #2D2D2D; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); overflow: hidden;">
            <img
              src="${
        game.background_image ||
        "https://via.placeholder.com/300x180?text=No+Image"
      }"
              alt="${game.name}"
              class="game-card-img" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid #2D2D2D;"
            />
            <div class="game-card-body" style="padding: 20px; text-align: left; color: #E0E0E0;">
              <h5 class="game-card-title" style="color: #00FF00; font-family: 'Kanit', sans-serif; font-size: 1.5em; margin-bottom: 10px;">${
        game.name
      }</h5>
              <p class="game-card-meta" style="color: #B0B0B0; font-size: 0.9em; margin-bottom: 15px;">
                Ngày phát hành : ${game.released || "N/A"}
              </p>
              <button class="btn btn-sm btn-outline-info view-details-btn" style="color: #007AFF; border-color: #007AFF; font-size: 0.9em; font-weight: 600;">
                Xem chi tiết
              </button>
            </div>
          </div>`;
      gameList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Lỗi khi gọi API:", error);
    gameList.innerHTML = "<li>Không thể tải dữ liệu game.</li>";
  });
