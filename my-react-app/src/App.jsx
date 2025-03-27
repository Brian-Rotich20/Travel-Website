import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Destinations from "./Pages/Destinations";
import Contact from "./Pages/Contact";
import { LoginPage, SignupPage } from "./components/AuthPage";



function App() {
  return (
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/login" element={<SignupPage />}/>
        <Route path="/Destinations" element={<Destinations />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>    
  );
}

export default App;
