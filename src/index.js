import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCEOCacjXAJdCjMMqv_GQzHtlMD4CszJ4g",
    authDomain: "fir-c50c6.firebaseapp.com",
    projectId: "fir-c50c6",
    storageBucket: "fir-c50c6.appspot.com",
    messagingSenderId: "112558786279",
    appId: "1:112558786279:web:29ac397c5fb5f05e1f0442"
};

// Initialize Firebase (only once)
initializeApp(firebaseConfig);


// Init services
const db = getFirestore();

//collection ref
const collectionRef = collection(db, 'books');

// get collection data
getDocs(collectionRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc)=>{
            books.push({...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch((err)=>console.log(err))


// adding documents
const addBook = document.querySelector('.add');
addBook.addEventListener('submit', (e)=>{
    e.preventDefault() // prevent page Reloading

    addDoc(collectionRef, {
        title: addBook.title.value,
        author: addBook.author.value
    })
    .then(() =>{
        addBook.reset()
    })

})

// deleting deocuments
const deleteBook = document.querySelector('.delete');
deleteBook.addEventListener('submit', (e)=>{
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBook.id.value)
    deleteDoc(docRef)
    .then(()=>{
        deleteBook.reset()
    })
})