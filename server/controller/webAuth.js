import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers';
import { admin, db } from '../firebase.js';

// Configuration WebAuthn
const rpID = process.env.DEV ? 'localhost' : 'shops-tools.onrender.com'; // Domaine de votre application
const origin = process.env.DEV
  ? `http://${rpID}:9200`
  : 'https://shops-tools.onrender.com'; // Changez pour https en production

export const webAuth = {
  async generateRegistration(req, res) {
    const { user } = req.body;

    const options = await generateRegistrationOptions({
      rpName: 'Mon App Quasar',
      rpID: rpID,
      userID: isoUint8Array.fromUTF8String(user.uid),
      userName: user.displayName,
      attestationType: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform', // pour empreinte digitale
        residentKey: 'required',
        requireResidentKey: true,
        userVerification: 'preferred',
      },
    });

    req.session.challenge = options.challenge;
    req.session.user = user;

    res.json(options);
  },
  async verifyRegistration(req, res) {
    const { attResp } = req.body;
    const expectedChallenge = req.session.challenge;

    const verification = await verifyRegistrationResponse({
      response: attResp,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    if (verification.verified) {
      /* TODO: Credential a enregistrer dans la base de données */
      const credential = verification.registrationInfo.credential;

      // Save plusieurs credentials par utilisateur :
      await db
        .collection('credentials')
        .doc(credential.id)
        .set({ ...credential, uid: req.session.user.uid });

      // Pas besoin de createCustomToken car le user est déjà connecté via firebase auth

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  },

  async generateAuthentication(req, res) {
    const options = await generateAuthenticationOptions({
      rpID: rpID,

      userVerification: 'required',
    });

    req.session.challenge = options.challenge;

    res.json(options);
  },
  async verifyAuthentication(req, res) {
    const expectedChallenge = req.session.challenge;

    /* récupère les credentials correspondant à l'authentificator depuis la base de donnée */
    /* l'id de la credential / authentificator */

    const credentialRef = db.collection('credentials').doc(req.body.id); // id de la credential

    const credentialSnap = await credentialRef.get();

    const userCredential = credentialSnap.data();

    const verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: userCredential.id,
        publicKey: userCredential.publicKey,
        counter: userCredential.counter,
      },
    });

    if (verification.verified) {
      const firebaseUid = userCredential.uid;

      console.log('firebaseUid', userCredential);

      const firebaseToken = await admin.auth().createCustomToken(firebaseUid);

      req.session.challenge = undefined;
      req.session.loggedIn = true;
      // créer une session ou retourner un token
      res.json({ success: true, token: firebaseToken });
    } else {
      res.status(401).json({ success: false });
    }
  },
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur de déconnexion' });
      }
      res.clearCookie('connect.sid'); // ou autre nom de cookie
      res.json({ success: true });
    });
  },
};
