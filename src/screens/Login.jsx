import { useState } from 'react';
import AuthShell from '../components/AuthShell';
import { validEmail, TAKEN_EMAILS } from '../lib/auth';

export default function Login({ navigate }) {
  const [mode, setMode] = useState('patient');
  const [errs, setErrs] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearErr = k => setErrs(e => ({ ...e, [k]: '' }));

  const submit = () => {
    const e = {};
    const mail = email.trim().toLowerCase();
    if (!mail) e.email = 'Email is required.';
    else if (!validEmail(mail)) e.email = 'Enter a valid email address.';
    else if (TAKEN_EMAILS.includes(mail)) e.email = 'This email is already registered.';
    if (!password) e.password = 'Enter your password.';
    setErrs(e);
    if (Object.keys(e).length === 0) navigate('home');
  };

  const isClinic = mode === 'clinic';

  return (
    <AuthShell tagline="login">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="sub">Log in to manage your appointments.</p>

        <div className="toggle-group">
          <button type="button" className={mode === 'patient' ? 'active' : ''} onClick={() => setMode('patient')}>I'm a Patient</button>
          <button type="button" className={isClinic ? 'active' : ''} onClick={() => setMode('clinic')}>I'm a Dental Clinic</button>
        </div>

        {isClinic && (
          <div className="clinic-note">
            <b>Clinic access:</b> Clinic accounts are created by request and activated after review by the DrSna team.{' '}
            <a onClick={() => navigate('register')} style={{ color: 'var(--blue-dark)', fontWeight: 600, cursor: 'pointer' }}>Apply as a clinic →</a>
          </div>
        )}

        {!isClinic && (
          <>
            <div className={'field' + (errs.email ? ' has-err' : '')}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={e => { setEmail(e.target.value); clearErr('email'); }}
                onBlur={() => setEmail(email.trim().toLowerCase())}
              />
              <div className="err">{errs.email || ''}</div>
            </div>
            <div className={'field' + (errs.password ? ' has-err' : '')}>
              <label>Password</label>
              <input type="password" value={password} placeholder="Enter your password" onChange={e => { setPassword(e.target.value); clearErr('password'); }} />
              <div className="err">{errs.password || ''}</div>
            </div>

            <div className="row-between">
              <label className="checkbox"><input type="checkbox" />Remember me</label>
            </div>

            <button type="button" className="btn-primary" onClick={submit}>Log in</button>
          </>
        )}

        <div className="divider">or</div>
        <button type="button" className="btn-google">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Continue with Google
        </button>

        <p className="switch-line" style={{ marginTop: 24 }}>
          Don't have an account? <a onClick={() => navigate('register')}>Create one</a>
        </p>
      </div>
    </AuthShell>
  );
}
