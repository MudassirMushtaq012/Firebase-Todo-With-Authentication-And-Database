import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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
// const auth = getAuth(app);
const db = getFirestore(app);
  

const todoinp = document.getElementById('todo')
const getul = document.getElementById('getul')
const ids = [];

window.gettodo = async function(){
  try {
    const docRef = await addDoc(collection(db, 'Todos'), {
      Todos: todoinp.value, 
      Time: new Date().toLocaleString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    errorPara.innerText = "Error adding document: ", e;
    setTimeout(() => {
      errorPara.innerHTML = "";
    }, 3000);
  }
  todoinp.value = ''
}

function getData(){
    onSnapshot(collection(db,'Todos'),(data)=>{
      data.docChanges().forEach((newData)=>{
        ids.push(newData.doc.id)
        // console.log(ids);
        if(newData.type == 'removed'){
          let del = document.getElementById(newData.doc.id)
          if(del){
            del.remove()
          }
        }
        else if(newData.type == 'added'){
          console.log(newData.doc.data());
          getul.innerHTML += `<li id=${newData.doc.id}>${newData.doc.data().Todos} <br>(${newData.doc.data().Time})<button id="delete-btn" onclick="deltodo('${newData.doc.id}')">Delete</button><button id="edit-btn" onclick="edittodo(this,'${newData.doc.id}')">Edit</button></li>`
        }
      })
    })
}

getData()

window.getData = getData

window.deltodo = async function(id){
  await deleteDoc(doc(db, "Todos", id));
}

window.edittodo = async function(e,id){
  const editval = prompt('Enter Edit Value')
  e.parentNode.firstChild.nodeValue = editval
  await updateDoc(doc(db, "Todos", id), {
  Todos: editval,
  Time: new Date().toLocaleString()
});
}

window.deletetodo = async function(){
  getul.innerHTML = ''
  console.log(ids);
  let array = []
  for(var i = 0; i < ids.length; i++){
    array.push(await deleteDoc(doc(db, "Todos", ids[i])))
  }
  Promise.all(array)
  .then((res)=>console.log('Data Delete'))
  .catch((err)=>console.log(err))
}

window.gettodo = gettodo