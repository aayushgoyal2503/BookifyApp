import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom"
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";


const LoginPage = () => {
  const firebase = useFirebase();
  const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 useEffect(()=>{
  if(firebase.isLoggedIn) {
    //navigate to home 
    navigate("/");
  }
 },[firebase,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login in a user...");
    const result = await firebase.singinUserWithEmailAndPass(email, password);
    console.log("Successfull", result);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        Signin with Google
      </Button>
    </div>
  );
};

export default LoginPage;

// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import { useFirebase } from "../context/Firebase";

// const LoginPage = () => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (firebase.isLoggedIn) {
//       // Navigate to home 
//       navigate("/");
//     }
//   }, [firebase.isLoggedIn, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       console.log("Logging in a user...");
//       const result = await firebase.signinUserWithEmailAndPass(email, password);
//       console.log("Successful", result);
//     } catch (err) {
//       console.error("Error logging in:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignin = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       await firebase.signinWithGoogle();
//     } catch (err) {
//       console.error("Error signing in with Google:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter email"
//             disabled={loading}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type="password"
//             placeholder="Password"
//             disabled={loading}
//           />
//         </Form.Group>

//         {error && <p className="text-danger">{error}</p>}

//         <Button variant="primary" type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Login"}
//         </Button>
//       </Form>
//       <h1 className="mt-5 mb-5">OR</h1>
//       <Button onClick={handleGoogleSignin} variant="danger" disabled={loading}>
//         {loading ? "Loading..." : "Signin with Google"}
//       </Button>
//     </div>
//   );
// };

// export default LoginPage;
