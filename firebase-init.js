// Shared Firebase init for the Eat website (same project as the iOS app: eat-2d454,
// so accounts are identical across web + app). apiKey here is a PUBLIC web key —
// safe to ship in the browser. (The secret service-account key is NOT here.)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG5u_fKf7UONsaHIy_8ECfUC1pgyixdE0",
  authDomain: "eat-2d454.firebaseapp.com",
  projectId: "eat-2d454",
  storageBucket: "eat-2d454.firebasestorage.app",
  messagingSenderId: "308665649270",
  appId: "1:308665649270:web:21f68387f7a886cc893757",
  measurementId: "G-3N4HQJSRXV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const WORKER = "https://eat-claude-proxy.mohammed-alsafwani.workers.dev";
