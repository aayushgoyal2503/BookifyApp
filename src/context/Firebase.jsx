import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  
} from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,doc,getDoc,query,where} from "firebase/firestore"
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDZJugxLwUuml1WVhPYVTYeIDx5z8q2GVM",
  authDomain: "bookify-9620f.firebaseapp.com",
  projectId: "bookify-9620f",
  storageBucket: "bookify-9620f.appspot.com",
  messagingSenderId: "307202699035",
  appId: "1:307202699035:web:728b6d7e7fb9bb22adedbe"

};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore=getFirestore(firebaseApp);
const storage=getStorage(firebaseApp);


const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  
  const [user,setUser]=useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    });
  }, []);


  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
   
  const handleCreateNewListing= async (name,isbn,price,cover)=>{
     const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
     const uploadResult=await uploadBytes(imageRef,cover);
     return await addDoc(collection(firestore,'books'),{
      name,
      isbn,
      price,
      imageURL:uploadResult.ref.fullPath,
      userID:user.uid,
      userEmail:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
     })
  };
  
  const getImageURL=(path)=>{
    return getDownloadURL(ref(storage,path));
  }

  const placeOrder= async (bookId,qty)=>{
    const collectionRef=collection(firestore,"books",bookId,"orders");
    const result= await addDoc(collectionRef,{
      userID:user.uid,
      userEmail:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
      qty:Number(qty),
    });
    return result;
  };


  const listAllBooks=()=>{
    return getDocs(collection(firestore,'books'))
  };
  
  const getBookById=async (id)=>{
     const docRef=doc(firestore,'books',id);
     const result=await getDoc(docRef);
     return result;
  }

  const isLoggedIn=user?true:false;

  const fetchMyBooks= async (userID)=>{
    
    const collectionRef=collection(firestore,"books");
    const q=query(collectionRef,where("userID","==",userID));
    const result=await getDocs(q);
    return result;
  }

  const getOrders= async(bookId)=>{
    const collectionRef=collection(firestore,"books",bookId,"orders");
    const result=await getDocs(collectionRef);
    return result;
  }

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};