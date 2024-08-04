import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Bookdetail = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firebase.getBookById(params.bookId)
      .then(value => setData(value.data()));
  }, [params.bookId, firebase]);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data, firebase]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log(result);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  if (data === null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      {success && (
        <Alert variant="success">
          Order placed successfully, go to the home page for placing more orders.
        </Alert>
      )}
      <h1>{data.name}</h1>
      <img src={url} width="25%" style={{ borderRadius: "10px" }} alt="Book cover" />
      <br />
      <h2>Details</h2>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h2>Owner Details</h2>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="number"
          placeholder="Enter Quantity"
        />
      </Form.Group>

      <Button onClick={placeOrder} variant="success">Buy Now</Button>
    </div>
  );
};

export default Bookdetail;
