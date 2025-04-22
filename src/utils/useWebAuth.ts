import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';
import { AddPromiseError } from 'src/types';
import { useFirebaseAuth } from 'utils/useFirebaseAuth';
import { useAuth } from 'src/stores/auth';
import { Notify } from 'quasar';
import { mdiAlertCircleOutline } from '@quasar/extras/mdi-v7';

const auth = useAuth();

export const useWebAuth = {
  async registerCredential() {
    try {
      const res = await fetch(
        'http://localhost:3000/auth/generate-registration-options',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: auth.user,
          }),
          credentials: 'include',
        },
      );
      const options = await res.json();

      // 🔥 Injecte la config pour resident key
      options.authenticatorSelection = {
        residentKey: 'required',
        userVerification: 'preferred', // ou 'required' si tu veux forcer biométrie
      };

      options.extensions = {
        credProps: true,
      };

      const attResp = await startRegistration({ optionsJSON: options });

      await fetch('http://localhost:3000/auth/verify-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attResp,
        }),
        credentials: 'include',
      });

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
      auth.isFetchingData = true;
      const res = await fetch(
        'http://localhost:3000/auth/generate-authentication-options',
        {
          credentials: 'include',
        },
      );
      const options = await res.json();

      options.userVerification = 'required';

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

      const { token } = await response.json();

      await useFirebaseAuth.signInWithWebAuth(token);

      auth.isFetchingData = false;

      return {
        success: true,
      };
    } catch (error) {
      const typedError = error as AddPromiseError;
      console.log(typedError.message, 'try to regsiter credential first');
      Notify.create({
        message: "L'authentification a échoué, veuillez réessayer",
        color: 'negative',
        icon: mdiAlertCircleOutline,
        timeout: 3000,
        progress: true,
      });
      auth.isFetchingData = false;
      return {
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
