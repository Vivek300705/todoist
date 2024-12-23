import './App.css';
import Footer from './component/footer/footer';
import Home from './component/home/Home';
import Navbar from './component/navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <div>
    <Navbar/>
    <Home/>
    <Footer/>
    </div>
  );
}

export default App;