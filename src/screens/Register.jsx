import { useState } from 'react';
import AuthShell from '../components/AuthShell';
import { CITIES, MONTHS, DAYS, YEARS, validEmail, TAKEN_EMAILS, TAKEN_LICENSES, PASSWORD_RE, LICENSE_RE } from '../lib/auth';

function Select({ id, options, placeholder, value, onChange }) {
  return (
    <select id={id} className="sel" value={value} onChange={onChange}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

const EMPTY = {
  pName: '', pEmail: '', pCity: '', pPassword: '', pConfirm: '', pTerms: false,
  cName: '', cLicense: '', cOwner: '', cEmail: '', cCity: '', cAddress: '', cTerms: false,
};

export default function Register({ navigate }) {
  const [mode, setMode] = useState('patient');
  const [gender, setGender] = useState('female');
  const [errs, setErrs] = useState({});
  const [f, setF] = useState(EMPTY);

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
    if (!f.pTerms) e.pTerms = 'Please accept the Terms & Privacy Policy.';
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
    if (f.cOwner.trim().length < 2) e.cOwner = 'Owner name must be at least 2 characters.';
    if (!email) e.cEmail = 'Email is required.';
    else if (!validEmail(email)) e.cEmail = 'Enter a valid email address.';
    else if (TAKEN_EMAILS.includes(email)) e.cEmail = 'This email is already registered.';
    if (!f.cCity) e.cCity = 'Please select your city.';
    if (!f.cAddress.trim()) e.cAddress = 'Address is required.';
    if (!f.cTerms) e.cTerms = 'Please accept the Terms & Privacy Policy.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (mode === 'clinic') {
      if (validateClinic()) {
        navigate('clinic-submitted', { clinicName: f.cName.trim(), clinicEmail: f.cEmail.trim().toLowerCase() });
      }
    } else if (validatePatient()) {
      navigate('verify', { email: f.pEmail.trim().toLowerCase() });
    }
  };

  const isClinic = mode === 'clinic';
  const fieldCls = k => 'field' + (errs[k] ? ' has-err' : '');

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
              <input type="text" value={f.pName} placeholder="Sarah Al-Amin" onChange={e => { set('pName', e.target.value); clearErr('pName'); }} />
              <div className="err">{errs.pName || ''}</div>
            </div>
            <div className="field">
              <label>Gender</label>
              <div className="toggle-group gender-toggle" style={{ marginBottom: 0 }}>
                <button type="button" className={gender === 'female' ? 'active' : ''} onClick={() => setGender('female')}>Female</button>
                <button type="button" className={gender === 'male' ? 'active' : ''} onClick={() => setGender('male')}>Male</button>
              </div>
            </div>
            <div className="field">
              <label>Date of birth</label>
              <div className="dob-row">
                <Select id="dobDay" options={DAYS} placeholder="Day" />
                <Select id="dobMonth" options={MONTHS} placeholder="Month" />
                <Select id="dobYear" options={YEARS} placeholder="Year" />
              </div>
            </div>
            <div className={fieldCls('pCity')}>
              <label>City</label>
              <Select id="patientCity" options={CITIES} placeholder="Select city" value={f.pCity} onChange={e => { set('pCity', e.target.value); clearErr('pCity'); }} />
              <div className="err">{errs.pCity || ''}</div>
            </div>
            <div className={fieldCls('pEmail')}>
              <label>Email address</label>
              <input
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
              <input type="password" value={f.pPassword} placeholder="Create a password" onChange={e => { set('pPassword', e.target.value); clearErr('pPassword'); }} />
              <div className="err">{errs.pPassword || ''}</div>
              <div className="field-hint">8–12 characters with at least one number and one special character.</div>
            </div>
            <div className={fieldCls('pConfirm')}>
              <label>Confirm password</label>
              <input type="password" value={f.pConfirm} placeholder="Re-enter your password" onChange={e => { set('pConfirm', e.target.value); clearErr('pConfirm'); }} />
              <div className="err">{errs.pConfirm || ''}</div>
            </div>
            <div className={fieldCls('pTerms')}>
              <label className="checkbox"><input type="checkbox" checked={f.pTerms} onChange={e => { set('pTerms', e.target.checked); clearErr('pTerms'); }} />I agree to the Terms &amp; Privacy Policy</label>
              <div className="err">{errs.pTerms || ''}</div>
            </div>
          </div>
        )}

        {isClinic && (
          <div id="clinicFields">
            <div className={fieldCls('cName')}>
              <label>Clinic name</label>
              <input type="text" value={f.cName} placeholder="Bright Smiles Dental Clinic" onChange={e => { set('cName', e.target.value); clearErr('cName'); }} />
              <div className="err">{errs.cName || ''}</div>
            </div>
            <div className="clinic-note">
              <b>Note:</b> Clinic accounts are reviewed by the DrSna team before appearing in patient search results. This usually takes 1–2 business days.
            </div>
            <div className={fieldCls('cLicense')}>
              <label>License number</label>
              <input type="text" value={f.cLicense} placeholder="e.g. 45120" onChange={e => { set('cLicense', e.target.value); clearErr('cLicense'); }} />
              <div className="err">{errs.cLicense || ''}</div>
              <div className="field-hint">Jordan Ministry of Health license (5–10 digits)</div>
            </div>
            <div className={fieldCls('cOwner')}>
              <label>Owner name</label>
              <input type="text" value={f.cOwner} placeholder="Owner's full name" onChange={e => { set('cOwner', e.target.value); clearErr('cOwner'); }} />
              <div className="err">{errs.cOwner || ''}</div>
            </div>
            <div className={fieldCls('cEmail')}>
              <label>Contact email</label>
              <input
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
              <Select id="clinicCity" options={CITIES} placeholder="Select city" value={f.cCity} onChange={e => { set('cCity', e.target.value); clearErr('cCity'); }} />
              <div className="err">{errs.cCity || ''}</div>
            </div>
            <div className={fieldCls('cAddress')}>
              <label>Address</label>
              <input type="text" value={f.cAddress} placeholder="Area, street, building number" onChange={e => { set('cAddress', e.target.value); clearErr('cAddress'); }} />
              <div className="err">{errs.cAddress || ''}</div>
            </div>
            <div className="field">
              <label>Website <span className="opt">(optional)</span></label>
              <input type="text" placeholder="https://..." />
            </div>
            <div className="field">
              <label>Additional notes <span className="opt">(optional)</span></label>
              <input type="text" placeholder="Number of doctors, specialties, working hours..." />
            </div>
            <div className={fieldCls('cTerms')}>
              <label className="checkbox"><input type="checkbox" checked={f.cTerms} onChange={e => { set('cTerms', e.target.checked); clearErr('cTerms'); }} />I agree to the Terms &amp; Privacy Policy</label>
              <div className="err">{errs.cTerms || ''}</div>
            </div>
          </div>
        )}

        <button type="button" className="btn-primary" onClick={submit}>
          {isClinic ? 'Submit request' : 'Create account'}
        </button>

        <p className="switch-line" style={{ marginTop: 24 }}>
          Already have an account? <a onClick={() => navigate('login')}>Log in</a>
        </p>
      </div>
    </AuthShell>
  );
}
