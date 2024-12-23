import './App.css';
import Home from './component/home/Home';
import Navbar from './component/navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <div>
    <Navbar/>
    <Home/>
    </div>
  );
}

export default App;
