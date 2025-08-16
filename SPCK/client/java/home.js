const viewValo = document.querySelector("#view-valorant");
const viewPubg = document.querySelector("#view-pubg");
const viewLol = document.querySelector("#view-lol");
const buttonSignup = document.querySelector("#signup-button");
if (viewValo) {
  viewValo.addEventListener("click", () => {
    window.location.href = "valorant-detail.html";
  });
}
if (viewPubg) {
  viewPubg.addEventListener("click", () => {
    window.location.href = "pubg-detail.html";
  });
}
if (viewLol) {
  viewLol.addEventListener("click", () => {
    window.location.href = "lol-detail.html";
  });
}
if (buttonSignup) {
  buttonSignup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}
function getUserFromLocalStorage() {
  try {
    const userJSON = localStorage.getItem("currentUser");
    if (userJSON === null) {
      console.log("Không tìm thấy thông tin người dùng trong localStorage.");
      return null;
    }
    const userObject = JSON.parse(userJSON);
    document.getElementById("signup-button").style.display = "none";
    console.log("Thông tin người dùng đã được lấy từ localStorage!");
    console.log(userObject);
    const username = userObject.username;
    const email = userObject.email;
    const role = userObject.role;
    const time = new Date();
    const usernameSpan = document.getElementById("username-span");
    const emailSpan = document.getElementById("email-span");
    const roleSpan = document.getElementById("role-span");
    const timeSpan = document.getElementById("time-span");
    usernameSpan.textContent = username;
    emailSpan.textContent = email;
    roleSpan.textContent = "Khách hàng";
    timeSpan.textContent = time.toLocaleString();
    return userObject;
  } catch (error) {
    console.error("Lỗi khi lấy người dùng từ localStorage:", error);
    return null;
  }
}
const loggedInUser = getUserFromLocalStorage();
if (loggedInUser) {
  console.log("Chào mừng, " + loggedInUser.username + "!");
  document.getElementById("signup-button").style.display = "none";
}
const logoutBut = document.querySelector("#logout");
logoutBut.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
});
const editProfile = document.querySelector("#edit");
editProfile.addEventListener("click", () => {
  const userJSON = localStorage.getItem("currentUser");
  if (userJSON == null) {
    alert("Bạn chưa có tài khoản. Hãy đăng kí ngay");
    window.location.href = "signup.html";
  } else {
    window.location.href = "edit-account.html";
  }
});
function changeUserInformation() {
  const cuser = JSON.parse(localStorage.getItem("changeuser"));
  const cusername = cuser.username;
  const cemail = cuser.email;
  const usernameSpan = document.getElementById("username-span");
  const emailSpan = document.getElementById("email-span");
  usernameSpan.textContent = cusername;
  emailSpan.textContent = cemail;
  localStorage.clear();
}
const apiKey = "fe4914f6aef8482786060205b9228694";
const searchInput = document.getElementById("game-search-input");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;
  searchResults.innerHTML = "";
  hideSearchResults();
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Đang tìm kiếm...";
  loadingMessage.classList.add("text-white", "text-center");
  searchResults.appendChild(loadingMessage);
  searchResults.classList.add("show");

  fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
      query
    )}&page_size=5`
  )
    .then((res) => res.json())
    .then((data) => {
      displaySearchResults(data.results);
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      searchResults.innerHTML = "";
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Không thể tải dữ liệu.";
      errorMessage.classList.add("text-danger", "text-center");
      searchResults.appendChild(errorMessage);
    });
});

function displaySearchResults(games) {
  const searchResults = document.getElementById("search-results");

  if (games.length === 0) {
    searchResults.innerHTML =
      '<p class="text-white text-center">Không tìm thấy game nào.</p>';
    searchResults.classList.add("show");
    return;
  }

  const row = document.createElement("div");
  row.classList.add("row", "g-4");

  games.forEach((game) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");
    col.innerHTML = `
      <div class="game-card">
        <img src="${game.background_image}" alt="${game.name}" class="game-card-img" />
        <div class="game-card-body">
          <h5 class="game-card-title">${game.name}</h5>
          <p class="game-card-meta">
            Ngày phát hành : ${game.released}
          </p>
          <button class="btn btn-sm btn-outline-info view-details-btn" data-game-id="${game.id}" id = "like">
            Yêu thích
          </button>
        </div>
      </div>
    `;
    row.appendChild(col);
  });

  searchResults.innerHTML = "";
  searchResults.appendChild(row);
  searchResults.classList.add("show");
}
function hideSearchResults() {
  const searchResults = document.getElementById("search-results");
  searchResults.classList.remove("show");
  searchResults.innerHTML = "";
}
const gameid = document.querySelector("#like");
if (gameid) {
  alert("Bạn đã thêm game vào danh sách yêu thích");
}
