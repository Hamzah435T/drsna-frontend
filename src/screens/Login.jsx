import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PasswordInput from '../components/PasswordInput';
import { validEmail } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const [errs, setErrs] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearErr = k => setErrs(e => ({ ...e, [k]: '' }));

  const submit = () => {
    const e = {};
    const mail = email.trim().toLowerCase();
    if (!mail) e.email = 'Email is required.';
    else if (!validEmail(mail)) e.email = 'Enter a valid email address.';
    if (!password) e.password = 'Enter your password.';
    setErrs(e);
    if (Object.keys(e).length === 0) navigate('/home');
  };

  return (
    <AuthShell tagline="login">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="sub">Log in to manage your appointments.</p>

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
          <PasswordInput value={password} placeholder="Enter your password" onChange={e => { const val = e.target.value;
            if (val.length <= 20) {
              setPassword(val);
              clearErr('password');
            } }} />
          <div className="err">{errs.password || ''}</div>
        </div>

        <button type="button" className="btn-primary" onClick={submit}>Log in</button>

        <p className="switch-line" style={{ marginTop: 24 }}>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </AuthShell>
  );
}
