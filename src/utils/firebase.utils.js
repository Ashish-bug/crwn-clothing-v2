// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmMZUUo1BCIzthIK9mZZO17jQ8Pwzzr3c",
  authDomain: "crwn-db-6dce7.firebaseapp.com",
  projectId: "crwn-db-6dce7",
  storageBucket: "crwn-db-6dce7.firebasestorage.app",
  messagingSenderId: "335716342818",
  appId: "1:335716342818:web:9d593f34f8853f514cbe7b",
  measurementId: "G-HEXWEYN7NJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});
const analytics = getAnalytics(firebaseApp);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
  const userDocRef = doc(db,'users',userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if(!userSnapShot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    }
    catch(error){
      console.log("Error while creating the user doc:",error.message);
    }
  }
  return userDocRef;
}