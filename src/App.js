
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import {About} from './pages/About';
import { HeaderComponent } from './components/HeaderComponent';
function App() {
  return (
    <Router>
       <nav>
         <HeaderComponent/>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
