import {Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./pages/Register";
import './App.css'
import LoginPage from "./pages/Login";
import MyNav from "./components/navbar";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import Bookdetail from "./pages/Detail";
import OrdersPage from "./pages/orders";
import ViewOrderDetails from "./pages/ViewOrderDetail";

function App() {
 
  return (
    <div>
    <MyNav/>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/book/list" element={<ListingPage/>}/>
    <Route path="/book/view/:bookId" element={<Bookdetail/>}/>
    <Route path="/book/orders" element={<OrdersPage/>}/>
    <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>

  </Routes>
  </div>
  )
}

export default App
