import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import BooKings from './components/BooKings';
import Home from './pages/Home';
import Footer from './components/Footer';





function App() {
 
  return (
    <Router>
    <Navbar/>
    <BooKings/>
                
                <Routes>
                   {/* <Route path="/login" element={<Login />} /> */}
                  
                  <Route path="/" element={<Home />} />
                  
               
                </Routes>
      
           <Footer/>
    </Router>
  )
}

export default App