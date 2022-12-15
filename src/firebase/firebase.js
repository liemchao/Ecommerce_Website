
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDV6VdU81BvoRDnxDPqnfeCN9BRvon9-YA",
  authDomain: "crm-cstone.firebaseapp.com",
  projectId: "crm-cstone",
  storageBucket: "crm-cstone.appspot.com",
  messagingSenderId: "568639907795",
  appId: "1:568639907795:web:ee95fc2c00e9869958f126",
  measurementId: "G-YTDTX8VY9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
