import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBrP4zlK9jl4OAb2mP1EICCEVACncCvhQ",
  authDomain: "fir-9-dojo-c87a9.firebaseapp.com",
  projectId: "fir-9-dojo-c87a9",
  storageBucket: "fir-9-dojo-c87a9.appspot.com",
  messagingSenderId: "45905629228",
  appId: "1:45905629228:web:9fe8d1c0b3c2e9c0d88189"
};

// init firebase app
initializeApp(firebaseConfig);


// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// ref collection data
getDocs(colRef)
  .then(snapshot => {
    let books = [];
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })



  }).catch(err => {
    console.log(err.message);
  })



const addFormElement = document.getElementById('add');
addFormElement.addEventListener('submit', e => {
  e.preventDefault();

  addDoc(colRef, {
    name: addFormElement.name.value,
    author: addFormElement.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => addFormElement.reset())


})


// this function will be called every time a change in collection occured

onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  fillSelectElement(books);
})

function fillSelectElement(books) {
  // add an option tag to the select element
  const selectElement = document.getElementById("books-select");
  books.forEach(book => {

    const optionElement = document.createElement('option');
    optionElement.id = book.id;
    optionElement.value = book.id;
    optionElement.innerHTML = `${book.name} - [${book.author}]`;

    selectElement.appendChild(optionElement);
  })
}

// query 

const q = query(colRef, orderBy("createdAt", "desc"));

onSnapshot(q, snapshot => {
  let books = [];
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id });
  })

  console.log(books);
})