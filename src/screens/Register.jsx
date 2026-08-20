import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PasswordInput from '../components/PasswordInput';
import { CITIES, validEmail, TAKEN_EMAILS, TAKEN_LICENSES, PASSWORD_RE, LICENSE_RE } from '../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('patient');
  const [errs, setErrs] = useState({});
  const [f, setF] = useState({
    pName: '', pEmail: '', pCity: '', pPassword: '', pConfirm: '',
    cName: '', cLicense: '', cEmail: '', cCity: '', cPassword: '',
  });

  const set = (k, val) => setF(prev => ({ ...prev, [k]: val }));
  const clearErr = k => setErrs(e => ({ ...e, [k]: '' }));

  const validatePatient = () => {
    const e = {};
    const email = f.pEmail.trim().toLowerCase();
    if (f.pName.trim().length < 2) e.pName = 'Name must be at least 2 characters.';
    if (!email) e.pEmail = 'Email is required.';
    else if (!validEmail(email)) e.pEmail = 'Enter a valid email address.';
    else if (TAKEN_EMAILS.includes(email)) e.pEmail = 'This email is already registered.';
    if (!f.pCity) e.pCity = 'Please select your city.';
    const pw = f.pPassword;
    if (!PASSWORD_RE.test(pw)) e.pPassword = 'Password must be 8–12 characters with at least one number and one special character.';
    if (pw && f.pConfirm !== pw) e.pConfirm = "Passwords don't match.";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const validateClinic = () => {
    const e = {};
    const email = f.cEmail.trim().toLowerCase();
    if (f.cName.trim().length < 2) e.cName = 'Clinic name must be at least 2 characters.';
    const lic = f.cLicense.trim();
    if (!lic) e.cLicense = 'License number is required.';
    else if (!LICENSE_RE.test(lic)) e.cLicense = 'License must be 5–10 digits (Jordan Ministry of Health format).';
    else if (TAKEN_LICENSES.includes(lic)) e.cLicense = 'This license number is already registered.';
    if (!email) e.cEmail = 'Email is required.';
    else if (!validEmail(email)) e.cEmail = 'Enter a valid email address.';
    else if (TAKEN_EMAILS.includes(email)) e.cEmail = 'This email is already registered.';
    if (!f.cCity) e.cCity = 'Please select your city.';
    if (!PASSWORD_RE.test(f.cPassword)) e.cPassword = 'Password must be 8–12 characters with at least one number and one special character.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (mode === 'clinic') {
      if (validateClinic()) {
        navigate('/clinic-request', { state: { clinicName: f.cName.trim(), clinicEmail: f.cEmail.trim().toLowerCase() } });
      }
    } else if (validatePatient()) {
      navigate('/verify', { state: { email: f.pEmail.trim().toLowerCase() } });
    }
  };

  const isClinic = mode === 'clinic';
  const fieldCls = k => 'field' + (errs[k] ? ' has-err' : '');
  const citySelect = (id, val, setKey) => (
    <select id={id} className="sel" value={val} onChange={e => { set(setKey, e.target.value); clearErr(setKey); }}>
      <option value="" disabled>Select city</option>
      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );

  return (
    <AuthShell tagline="register">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="sub">It only takes a minute to get started.</p>

        <div className="toggle-group">
          <button type="button" className={!isClinic ? 'active' : ''} onClick={() => setMode('patient')}>Patient account</button>
          <button type="button" className={isClinic ? 'active' : ''} onClick={() => setMode('clinic')}>Dental clinic account</button>
        </div>

        {!isClinic && (
          <div id="patientFields">
            <div className={fieldCls('pName')}>
              <label>Full name</label>
              <input id="pName" type="text" value={f.pName} placeholder="Sarah Al-Amin" onChange={e => { set('pName', e.target.value); clearErr('pName'); }} />
              <div className="err">{errs.pName || ''}</div>
            </div>
            <div className={fieldCls('pCity')}>
              <label>City</label>
              {citySelect('patientCity', f.pCity, 'pCity')}
              <div className="err">{errs.pCity || ''}</div>
            </div>
            <div className={fieldCls('pEmail')}>
              <label>Email address</label>
              <input
                id="pEmail"
                type="email"
                value={f.pEmail}
                placeholder="you@example.com"
                onChange={e => { set('pEmail', e.target.value); clearErr('pEmail'); }}
                onBlur={() => set('pEmail', f.pEmail.trim().toLowerCase())}
              />
              <div className="err">{errs.pEmail || ''}</div>
            </div>
            <div className={fieldCls('pPassword')}>
              <label>Password</label>
              <PasswordInput id="pPassword" value={f.pPassword} placeholder="Create a password" onChange={e => { const val = e.target.value;
                if (val.length <= 12) {
                  set('pPassword', val);
                  clearErr('pPassword');
                } }} />
              <div className="err">{errs.pPassword || ''}</div>
              <div className="field-hint">8–12 characters with at least one number and one special character.</div>
            </div>
            <div className={fieldCls('pConfirm')}>
              <label>Confirm password</label>
              <PasswordInput id="pConfirm" value={f.pConfirm} placeholder="Re-enter your password" onChange={e => { const val = e.target.value;
                if (val.length <= 12) {
                  set('pConfirm', val);
                  clearErr('pConfirm');
                } }} />
              <div className="err">{errs.pConfirm || ''}</div>
            </div>
          </div>
        )}

        {isClinic && (
          <div id="clinicFields">
            <div className={fieldCls('cName')}>
              <label>Clinic name</label>
              <input id="cName" type="text" value={f.cName} placeholder="Bright Smiles Dental Clinic" onChange={e => { set('cName', e.target.value); clearErr('cName'); }} />
              <div className="err">{errs.cName || ''}</div>
            </div>
            <div className={fieldCls('cLicense')}>
              <label>License number</label>
              <input
                id="cLicense"
                type="text"
                inputMode="numeric"
                value={f.cLicense}
                placeholder="e.g. 45120"
                maxLength={10}
                onChange={e => { set('cLicense', e.target.value.replace(/\D/g, '')); clearErr('cLicense'); }}
              />
              <div className="err">{errs.cLicense || ''}</div>
              <div className="field-hint">Jordan Ministry of Health license (5–10 digits)</div>
            </div>
            <div className={fieldCls('cEmail')}>
              <label>Contact email</label>
              <input
                id="cEmail"
                type="email"
                value={f.cEmail}
                placeholder="clinic@example.com"
                onChange={e => { set('cEmail', e.target.value); clearErr('cEmail'); }}
                onBlur={() => set('cEmail', f.cEmail.trim().toLowerCase())}
              />
              <div className="err">{errs.cEmail || ''}</div>
            </div>
            <div className={fieldCls('cCity')}>
              <label>City</label>
              {citySelect('clinicCity', f.cCity, 'cCity')}
              <div className="err">{errs.cCity || ''}</div>
            </div>
            <div className={fieldCls('cPassword')}>
              <label>Password</label>
              <PasswordInput id="cPassword" value={f.cPassword} placeholder="Create a password" onChange={e => { const val = e.target.value;
                if (val.length <= 12) {
                  set('cPassword', val);
                  clearErr('cPassword');
                } }} />
              <div className="err">{errs.cPassword || ''}</div>
              <div className="field-hint">8–12 characters with at least one number and one special character.</div>
            </div>
          </div>
        )}

        <button type="button" className="btn-primary" onClick={submit}>
          {isClinic ? 'Submit request' : 'Create account'}
        </button>

        <p className="switch-line" style={{ marginTop: 24 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </AuthShell>
  );
}
