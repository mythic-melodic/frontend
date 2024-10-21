import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistDashboard from './pages/ArtistProfile';
import PlayScreen from './pages/PlayScreen';
function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
          <Route path="/" element ={<HomePage/>}></Route>
          <Route path="/artist-profile" element ={<ArtistDashboard/>}></Route>
          <Route path="/play-screen" element ={<PlayScreen/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Consistent component name */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
