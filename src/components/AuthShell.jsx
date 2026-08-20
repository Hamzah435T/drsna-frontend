import logoIcon from '../assets/logo-icon.png';

const TAGLINES = {
  login: {
    h1: <>Book your dental visit<br />in just a few clicks.</>,
    p: "DrSna connects you with trusted dental clinics in your area — pick a time, confirm, and you're set.",
  },
  register: {
    h1: <>Join a growing network<br />of patients and clinics.</>,
    p: "Whether you're booking your next cleaning or listing your practice, getting started only takes a minute.",
  },
};

export default function AuthShell({ tagline = 'login', children }) {
  const t = TAGLINES[tagline] || TAGLINES.login;
  return (
    <div className="auth-wrap">
      <div className="auth-brand">
        <svg className="deco" width="420" height="420" style={{ top: '-80px', right: '-100px' }}>
          <circle cx="210" cy="210" r="210" fill="#ffffff" />
        </svg>
        <svg className="deco" width="260" height="260" style={{ bottom: '-60px', left: '-60px' }}>
          <circle cx="130" cy="130" r="130" fill="#ffffff" />
        </svg>

        <div className="brand">
          <span className="logo-mark"><img src={logoIcon} alt="DrSna" /></span>
          DrSna
        </div>

        <div className="tagline">
          <h1>{t.h1}</h1>
          <p>{t.p}</p>
        </div>

        <div className="illo">
          <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
            <rect x="20" y="20" width="180" height="100" rx="14" fill="#ffffff" fillOpacity="0.12" />
            <rect x="36" y="38" width="60" height="8" rx="4" fill="#ffffff" fillOpacity="0.5" />
            <rect x="36" y="54" width="100" height="8" rx="4" fill="#ffffff" fillOpacity="0.3" />
            <circle cx="170" cy="90" r="26" fill="#ffffff" fillOpacity="0.18" />
            <rect x="36" y="86" width="70" height="20" rx="6" fill="#ffffff" fillOpacity="0.25" />
          </svg>
        </div>

        <div className="foot">© DrSna — appointments made simple</div>
      </div>

      <div className="auth-form-side">{children}</div>
    </div>
  );
}
