import { useState } from 'react';
import './styles/auth.css';
import HomePage from './HomePage';
import Login from './screens/Login';
import Register from './screens/Register';
import VerifyEmail from './screens/VerifyEmail';
import ClinicSubmitted from './screens/ClinicSubmitted';

function App() {
  const [screen, setScreen] = useState('login');
  const [pending, setPending] = useState({});

  const navigate = (name, data) => {
    if (data) setPending(data);
    setScreen(name);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="too-narrow">
        <h2>DrSna is a desktop experience</h2>
        <p>This booking dashboard is designed for larger screens. Please open it on a laptop or desktop computer to continue.</p>
      </div>
      <div id="app">
        {screen === 'login' && <Login navigate={navigate} />}
        {screen === 'register' && <Register navigate={navigate} />}
        {screen === 'verify' && <VerifyEmail email={pending.email || ''} navigate={navigate} />}
        {screen === 'clinic-submitted' && (
          <ClinicSubmitted clinicName={pending.clinicName || ''} clinicEmail={pending.clinicEmail || ''} navigate={navigate} />
        )}
        {screen === 'home' && <HomePage navigate={navigate} />}
      </div>
    </>
  );
}

export default App;
