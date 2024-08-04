import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from "react-router-dom"

const BookCard=(props)=> {
    const firebase=useFirebase();
    const navigate=useNavigate();
    const [url,setURL]=useState(null);

    useEffect(()=>{
       firebase.getImageURL(props.imageURL).then((url)=>setURL(url));

    },[])

  return (
    <Card style={{ width: '18rem',margin:"15px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title> <h6>{props.name}</h6></Card.Title>
        <Card.Text>
          <hr />
           {props.displayName}
           <br />
          <h6>Rs:{props.price}</h6>
          
          <h6>ISBN:{props.isbn}</h6>
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)}
         variant='primary'>View</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;