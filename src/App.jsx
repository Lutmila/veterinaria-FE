import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage';
import MascotasPage from './pages/mascotas/MascotasPage';
import ClientesPage from './pages/clientes/ClientesPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
