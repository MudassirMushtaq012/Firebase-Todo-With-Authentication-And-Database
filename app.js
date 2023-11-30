import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {addDoc, getFirestore, collection, setDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOwargVcGjrO5KpN2XvNEdexhV2zK1Sm8",
    authDomain: "smit-authentication.firebaseapp.com",
    projectId: "smit-authentication",
    storageBucket: "smit-authentication.appspot.com",
    messagingSenderId: "900446899941",
    appId: "1:900446899941:web:241ecf4c2b7c0fc1fa0e0c",
    measurementId: "G-FH3FJNKHCG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const semail = document.getElementById('semail'); 
const spass = document.getElementById('spass');
const sbtn = document.getElementById('btn');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const eye = document.getElementById('eye');
const errorpara = document.getElementById('errorpara')



sbtn.addEventListener('click', ()=>{
    createUserWithEmailAndPassword(auth, semail.value, spass.value)
      .then(async(userCredential) => {

        const user = userCredential.user;

        console.log(user.uid)
        
        try {
          const docRef = await addDoc(collection(db, "signup"), {
            Email: semail.value,
            Password: spass.value,
            first : fname.value,
            last : lname.value,
          });
          console.log("Document written with ID: ", docRef.id);
          window.location = 'signin.html'
          } catch (e) {
            errorpara.innerText = "Error adding document: ", e;
            setTimeout(() => {
                errorpara.innerHTML = "";
            }, 3000);
          }
             
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = errorCode.slice(5).toUpperCase();
        const errMessage = errorMessage.replace(/-/g, " ")
        errorpara.innerText = errMessage;
            setTimeout(() => {
                errorpara.innerHTML = "";
            }, 3000);
      });    
})

if(eye){
  eye.addEventListener('click',()=>{
    if(spass.type == 'password'){
      spass.type = 'text'
    }
    else{
      spass.type = 'password'
      }
  })
}    