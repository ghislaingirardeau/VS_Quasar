import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { describe, expect, it } from 'vitest';

describe('Firebase mocks', () => {
  it('should not crash when getting Firestore', () => {
    const db = getFirestore();
    expect(db).toBeDefined();
  });

  it('should not crash when getting Auth', () => {
    const auth = getAuth();
    expect(auth).toBeDefined();
    expect(auth.currentUser).toBeNull();
  });

  it('should not crash when creating GoogleAuthProvider', () => {
    const provider = new GoogleAuthProvider();
    expect(provider).toBeDefined();
  });
});
