import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgLcLUYZ-QYJ89zs5ZIt7OgO4Q2Zz5w1k",
  authDomain: "spck-jsi06-debe6.firebaseapp.com",
  projectId: "spck-jsi06-debe6",
  storageBucket: "spck-jsi06-debe6.firebasestorage.app",
  messagingSenderId: "921824999794",
  appId: "1:921824999794:web:5b412cef7c7fcc8479c5eb",
  measurementId: "G-3TERLYRFMZ",
};
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
