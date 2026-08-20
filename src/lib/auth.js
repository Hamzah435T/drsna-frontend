// Shared constants + validators for the DrSna auth screens.
export const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const CITIES = ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Salt', 'Madaba', 'Mafraq', 'Jerash', 'Ajloun', 'Karak', 'Tafilah', "Ma'an"];

// Demo-only uniqueness checks — real checks run server-side.
export const TAKEN_EMAILS = ['taken@example.com'];
export const TAKEN_LICENSES = ['45120'];

export const PASSWORD_RE = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,12}$/;
export const LICENSE_RE = /^\d{5,10}$/;
