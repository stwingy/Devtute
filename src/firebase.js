import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'
import { now } from 'moment';
const firebaseConfig = {
    apiKey: "AIzaSyCMbgwn2Cbse7u-nlCFLnPB-91SxvWbsok",
    authDomain: "devtute-20827.firebaseapp.com",
    databaseURL: "https://devtute-20827.firebaseio.com",
    projectId: "devtute-20827",
    storageBucket: "gs://devtute-20827.appspot.com/",
    messagingSenderId: "1035784516491",
    appId: "1:1035784516491:web:34de87242c46b48fce358e",
    measurementId: "G-B8NV1CBJNZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const storage = firebase.storage()
export const signOut = () => auth.signOut()
window.firebase = firebase

export const createUserProfileDocument = async (user, additionalData) => {

    if (!user) return  //user signs out 
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user



        var date = new Date();
        var string = date.toLocaleDateString();
        const createdAt = string

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.error(error.message)
        }
    }
    return getUserDocument(user.uid)
}

export const getUserDocument = async (uid) => {
    if (!uid) return null
    try {
        const userDocument = await firestore.collection('users').doc(uid)
        return userDocument
    } catch (error) {
        console.error(error.message)
    }

}
export default firebase






//   Copy and paste these scripts into the bottom of your <body> tag, but before you use any Firebase services:


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.1.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCMbgwn2Cbse7u-nlCFLnPB-91SxvWbsok",
//     authDomain: "devtute-20827.firebaseapp.com",
//     databaseURL: "https://devtute-20827.firebaseio.com",
//     projectId: "devtute-20827",
//     storageBucket: "",
//     messagingSenderId: "1035784516491",
//     appId: "1:1035784516491:web:34de87242c46b48fce358e",
//     measurementId: "G-B8NV1CBJNZ"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>