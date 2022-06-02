import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Photo from './components/Photo';
import Gallery from './components/Gallery';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    Notification.requestPermission()
  },[])
  
  return (
    <div className="App">
      
    <Router>
        <Routes>
        <Route path='/' element={<Photo />} />
        <Route path='/gallery' element={<Gallery />} />
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
