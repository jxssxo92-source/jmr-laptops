// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDTTK6E78QSlcrjdskiQ0KHiNIn-o-6jds",
  authDomain: "jmr-laptops.firebaseapp.com",
  projectId: "jmr-laptops",
  storageBucket: "jmr-laptops.firebasestorage.app",
  messagingSenderId: "193604942748",
  appId: "1:193604942748:web:60a10a2b073a52e4b0a659",
  measurementId: "G-YG3GS7774B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
