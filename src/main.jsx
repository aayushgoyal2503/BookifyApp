import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import { FirebaseProvider } from './context/Firebase.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
    <App />
    </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
