// Firebase Config (NO changes needed)
const firebaseConfig = {
  apiKey: "AIzaSyD79-ltLdPBYTL8fZmXc0jS54K0DbHgO4E",
  authDomain: "abid-transactions.firebaseapp.com",
  projectId: "abid-transactions",
  storageBucket: "abid-transactions.appspot.com",
  messagingSenderId: "248716263657",
  appId: "1:248716263657:web:690f6b5314cc9cb1a2d94d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // ✅ This now works correctly
