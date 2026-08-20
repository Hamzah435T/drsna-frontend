import AuthShell from '../components/AuthShell';

export default function ClinicSubmitted({ clinicName, clinicEmail, navigate }) {
  return (
    <AuthShell tagline="login">
      <div className="auth-card centered">
        <div className="success-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#1c7a5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2>Request received</h2>
        <p className="sub">
          Thanks, <span className="verify-mail">{clinicName}</span>! Your request is now with the DrSna team.
        </p>
        <div className="info-box">
          Each clinic is reviewed before appearing in patient search results. This usually takes <b>1–2 business days</b>. We'll email <b>{clinicEmail}</b> once your clinic is approved and live.
        </div>
        <button type="button" className="btn-primary" onClick={() => navigate('login')}>Back to log in</button>
        <p className="switch-line" style={{ marginTop: 24 }}>
          Need to make a change? <a onClick={() => navigate('register')}>Submit another request</a>
        </p>
      </div>
    </AuthShell>
  );
}
