import { useRef, useState } from 'react';
import AuthShell from '../components/AuthShell';

export default function VerifyEmail({ email, navigate }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [err, setErr] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  const setDigit = (i, val) => {
    const d = val.replace(/\D/g, '').slice(0, 1);
    setOtp(o => {
      const next = [...o];
      next[i] = d;
      return next;
    });
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const onPaste = e => {
    e.preventDefault();
    const d = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp(d.split(''));
    if (d.length === 6) inputs.current[5]?.focus();
  };

  const submit = () => {
    if (otp.join('').length === 6) {
      navigate('home');
    } else {
      setErr(true);
    }
  };

  const resend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2500);
  };

  return (
    <AuthShell tagline="login">
      <div className="auth-card">
        <h2>Check your email</h2>
        <p className="sub">
          We sent a 6-digit verification code to <span className="verify-mail">{email}</span>
        </p>

        <div className="otp-row">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={el => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength="1"
              autoComplete="one-time-code"
              aria-label={`Digit ${i + 1}`}
              value={d}
              className={d ? 'filled' : ''}
              onChange={e => setDigit(i, e.target.value)}
              onKeyDown={e => onKeyDown(i, e)}
              onPaste={onPaste}
            />
          ))}
        </div>
        <div className={'otp-err' + (err ? ' show' : '')}>Enter the 6-digit code we sent to your email.</div>

        <button type="button" className="btn-primary" onClick={submit}>Verify email</button>

        <p className="resend-line">
          Didn't get the code? <a onClick={resend}>Resend code</a> <span className={'resend-ok' + (resent ? ' show' : '')}>Code resent!</span>
        </p>
        <p className="switch-line"><a onClick={() => navigate('register')}>Back to sign up</a></p>
      </div>
    </AuthShell>
  );
}
