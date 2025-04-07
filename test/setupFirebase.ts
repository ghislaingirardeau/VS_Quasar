// Firebase est utilisé dans l'application mais aussi lors des tests, il faut donc le mocker
// peu importe les donnees renvoyé par les mocks, c'est juste pour que le test ne plante pas mais reconnaisse les fonctions associé à FB
import { vi } from 'vitest';

// ✅ Mock firebase/app
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({ name: 'mock-app' })),
}));

// ✅ Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    signInWithPopup: vi.fn(),
  })),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  browserLocalPersistence: 'mock-browser-local-persistence',
  onAuthStateChanged: vi.fn((auth, callback) => {
    // simuler un utilisateur connecté
    callback({ uid: 'mock-user-id', email: 'test@example.com' });
    return () => {}; // simulate unsubscribe
  }),
}));

// ✅ Mock firebase/firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(),
    doc: vi.fn(),
    getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
  })),
  doc: vi.fn(() => ({
    id: 'mock-doc-id',
  })),
  updateDoc: vi.fn(() => Promise.resolve()),
  setDoc: vi.fn(() => Promise.resolve()),
  getDoc: vi.fn(() =>
    Promise.resolve({ exists: () => true, data: () => ({ foo: 'bar' }) }),
  ),
  collection: vi.fn(() => ({
    withConverter: vi.fn().mockReturnThis(),
  })),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
}));
