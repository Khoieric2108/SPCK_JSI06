const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  window.location.href = "index.html";
});
const euser = document.querySelector("#edit-username");
const eemail = document.querySelector("#edit-email");
const sub = document.querySelector("#submit");
sub.addEventListener("click", () => {
  const username = euser.value;
  const email = eemail.value;
  const userData = {
    username: username,
    email: email,
  };
  localStorage.setItem("changuser", JSON.stringify(userData));
  alert("Thay đổi thông tin thành công");
});
