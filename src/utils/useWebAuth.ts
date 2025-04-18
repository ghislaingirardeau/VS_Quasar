import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';
import { AddPromiseError } from 'src/types';
import { signInWithWebAuth } from 'src/boot/firebase';

export const useWebAuth = {
  async registerCredential() {
    try {
      const res = await fetch(
        'http://localhost:3000/auth/generate-registration-options',
        {
          credentials: 'include',
        },
      );
      const options = await res.json();

      const attResp = await startRegistration({ optionsJSON: options });

      const response = await fetch(
        'http://localhost:3000/auth/verify-registration',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attResp,
          }),
          credentials: 'include',
        },
      );

      // const { token } = await response.json();

      // await signInWithWebAuth(token);

      return {
        message: 'Enregistrement réussi',
        success: true,
      };
    } catch (error) {
      const typedError = error as AddPromiseError;
      console.log(typedError.message);
      return {
        message: "Échec de l'enregistrement",
        success: false,
      };
    }
  },
  async loginWithCredential() {
    try {
      const res = await fetch(
        'http://localhost:3000/auth/generate-authentication-options',
        {
          credentials: 'include',
        },
      );
      const options = await res.json();

      const asseResp = await startAuthentication({ optionsJSON: options });

      const response = await fetch(
        'http://localhost:3000/auth/verify-authentication',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(asseResp),
          credentials: 'include',
        },
      );

      // const { token } = await response.json();

      // await signInWithWebAuth(token);

      return {
        message: 'Vous êtes connecté',
        success: true,
      };
    } catch (error) {
      const typedError = error as AddPromiseError;
      console.log(typedError.message);
      return {
        message: "Une erreur est survenue lors de l'authentification",
        success: false,
      };
    }
  },
  async logout() {
    try {
      await fetch('http://localhost:3000/logout', {
        credentials: 'include',
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  },
  async isAuthentificate() {
    try {
      const result = await fetch('http://localhost:3000/me', {
        credentials: 'include',
      });
      const { user } = await result.json();
      return {
        user,
      };
    } catch (error) {
      const typedError = error as AddPromiseError;
      console.log(typedError.message);
      return {
        user: undefined,
      };
    }
  },
};
