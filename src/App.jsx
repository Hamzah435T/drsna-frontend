import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/auth.css';
import HomePage from './HomePage';
import Login from './screens/Login';
import Register from './screens/Register';
import VerifyEmail from './screens/VerifyEmail';
import ClinicSubmitted from './screens/ClinicSubmitted';

function App() {
  return (
    <BrowserRouter>
      <div className="too-narrow">
        <h2>DrSna is a desktop experience</h2>
        <p>This booking dashboard is designed for larger screens. Please open it on a laptop or desktop computer to continue.</p>
      </div>
      <div id="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/clinic-request" element={<ClinicSubmitted />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
