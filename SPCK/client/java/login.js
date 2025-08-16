import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth } from "./firebase-config.js";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");
const handleLogin = function (event) {
  event.preventDefault();
  let emailValue = email.value;
  let passwordValue = password.value;
  if (!emailValue || !passwordValue) {
    alert("Please enter both email and password");
    return;
  }
  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login Success");
      window.location.href = "index.html";
      return;
    })
    .catch((error) => {
      alert("Loi:" + error.message);
    });
};
if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}
