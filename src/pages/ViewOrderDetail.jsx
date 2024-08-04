import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import AcceptOrder from "./Accept";
import RejectOrder from "./Reject";


const ViewOrderDetails=()=>{

    const params=useParams();
    const firebase=useFirebase();

    const[accept,setAccept]=useState(false);
    const[reject,setReject]=useState(false);

    const [orders,setOrders]=useState([]);
    
    const handleAccept = () => {
        setAccept(true);
        setTimeout(() => setAccept(false), 3000);
    }

    const handleReject = () => {
        setReject(true);
        setTimeout(() => setReject(false), 3000);
    }


    useEffect(()=>{
        firebase.getOrders(params.bookId).then((orders)=> setOrders(orders.docs))
    },[])
    return (
        <div className="container">
            {
                accept && (
                    <AcceptOrder variant="success">
                        Order Accepted!
                    </AcceptOrder>
                )
            }

            {
                reject &&(
                    <RejectOrder variant="danger">
                        Order Rejected!
                    </RejectOrder>
                )
            }

           <h1>Orders:</h1>
           {
             orders.map(order=>{
                const data=order.data();
                return(
                    <div key={order.id}
                    className="mt-3" style={{border:"2px solid padding 10px"}}>
                        <h6>Qty:{data.qty}</h6>
                        <p>Email: {data.userEmail}</p>
                        <Button onClick={handleAccept} variant="success">Accept Order!</Button>{' '}
                        <Button onClick={handleReject}variant="danger">Reject Order</Button>{' '}

                        </div>
                )
             })
           }
        </div>
    )
}

export default ViewOrderDetails;