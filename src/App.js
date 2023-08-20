
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert =(message,Type)=>{
    setAlert({
      msg : message,
      type : Type
    })
    setTimeout(() => {
    setAlert(null)   
    }, 3000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>

          <Navbar />
          <Alert alert = {alert}/>
          <div className="container"> 
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert = {showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
