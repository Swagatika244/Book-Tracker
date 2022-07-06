import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDLW7GVMKI635ZW0VtM0nIkctada_JTAms",
  authDomain: "book-tracker-9ea73.firebaseapp.com",
  projectId: "book-tracker-9ea73",
  storageBucket: "book-tracker-9ea73.appspot.com",
  messagingSenderId: "137433536169",
  appId: "1:137433536169:web:a08eec14d33016dfafbbb8"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();