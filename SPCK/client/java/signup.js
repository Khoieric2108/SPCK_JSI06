import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth, db } from "./firebase-config.js";

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm_password");
const registerButton = document.querySelector("#submit");
const signupForm = document.querySelector("#signup-form");

const handleRegister = (event) => {
  event.preventDefault();
  let username = usernameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  let role_id = 2;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password and confirm password do not match.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        username: username,
        password: password,
        role: role_id,
        email: user.email,
      };
      addDoc(collection(db, "users"), userData);
      alert("User created");
      const userJSON = JSON.stringify(userData);
      localStorage.setItem("currentUser", userJSON);
      console.log(
        "Thông tin người dùng đã được lưu vào localStorage thành công!"
      );
      window.location.href = "login.html";
      return;
    })
    .catch((error) => {
      alert("Loi: " + error.message);
    });
};
if (registerButton) {
  registerButton.addEventListener("click", handleRegister);
}

if (signupForm) {
  signupForm.addEventListener("submit", handleRegister);
}
