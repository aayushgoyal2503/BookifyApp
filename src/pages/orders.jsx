import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import Alert from 'react-bootstrap/Alert';

const OrdersPage=()=>{
    const firebase=useFirebase();
    const [books,setBooks]=useState([]);
     
    useEffect(()=>{

        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid)
        ?.then((books)=> setBooks(books.docs));
    },[firebase])
     
    if(!firebase.isLoggedIn){
        return(
          <div className="container">
        <Alert variant="danger">
          Please Login to see the orders!
        </Alert>
        </div>
        )
      }

    return(
        <div>
            {
        books.map((book) => (
        <BookCard link={`/books/orders/${book.id}`}
        key={book.id}
         id={book.id} 
         {...book.data()}
         />
        ))}
        </div>
    )
}

export default OrdersPage;