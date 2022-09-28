import firebase from "firebase";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAJNxWVKHNscQmib6Aq99eqL9mGj-EyfmY",
    authDomain: "order-portal-navratri.firebaseapp.com",
    projectId: "order-portal-navratri",
    storageBucket: "order-portal-navratri.appspot.com",
    messagingSenderId: "97672575660",
    appId: "1:97672575660:web:47df49ae1f7623952ebd09"
};

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()

export default firebase
