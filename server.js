import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers';

import { admin, db } from './firebase.js';

const app = express();
const port = process.env.PORT || 3000;

/* BACKEND */

// Configuration WebAuthn
const rpID = process.env.DEV ? 'localhost' : 'shops-tools.onrender.com'; // Domaine de votre application
const origin = process.env.DEV
  ? `http://${rpID}:3000`
  : 'https://shops-tools.onrender.com'; // Changez pour https en production

// Configuration de base
app.use(
  cors({
    origin: ['http://localhost:9200', 'https://shops-tools.onrender.com'],
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use(
  session({
    secret: 'votre-secret-tres-securise',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, //* le token ne sera valable qu'un heure
      sameSite: 'lax',
    },
  }),
);

app.get('/api', async (req, res) => {
  res.send('Hello, Im your WebAuthn server for tools shop app!');
});

/* REGISTRATION TO WEBAUTH*/

/* Need user to be connected to register */
// Ou oblige à la 1ere connection de se connecter via firebase/google => user aura alors forcément un uid
// Une fois la 1ere connection réussi, on propose coté front à l'utilisateur de permettre la connexion via webAuth (évite le popup google)
// ainsi on aura uid de user qui correspond à son uid de firebase auth

app.post('/api/auth/generate-registration-options', async (req, res) => {
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
});

/* 2- REGISTRATION  */

app.post('/api/auth/verify-registration', async (req, res) => {
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
});

/* LOGIN */

app.get('/api/auth/generate-authentication-options', async (req, res) => {
  const options = await generateAuthenticationOptions({
    rpID: rpID,

    userVerification: 'required',
  });

  req.session.challenge = options.challenge;

  res.json(options);
});

app.post('/api/auth/verify-authentication', async (req, res) => {
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
});

/* LOGOUT */

/* WebAuthn sert uniquement à authentifier un utilisateur en prouvant qu’il possède une clé privée via un appareil biométrique.
 Mais la session ou le token d'authentification reste ce qui maintient l’état connecté, comme dans un login classique. */
app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de déconnexion' });
    }
    res.clearCookie('connect.sid'); // ou autre nom de cookie
    res.json({ success: true });
  });
});

/* IS USER CONNECTED ? */

app.get('/api/me', async (req, res) => {
  /* const userDb = await admin.auth().getUser('95AoiUHOIdTf4gPxgZxpVKAwjid2'); */
  res.json({ user: req.session.user /* userDb */ });
});

/* SERVE FRONTEND */

// Pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 📁 Chemins absolus vers ton build PWA
const pwaPath = path.resolve(__dirname, 'dist/pwa');
const indexPath = path.resolve(pwaPath, 'index.html');

// Sert les fichiers statiques (JS, CSS, etc.)
app.use(express.static(pwaPath));
// Redirige toutes les routes vers index.html (pour Vue Router mode history)

app.use((req, res, next) => {
  const indexPath = path.resolve(__dirname, 'dist/pwa/index.html');
  res.sendFile(indexPath);
});

/* MIDDLEWARE FOR CONNECTED USER */

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Non authentifié' });
}

/* Suppression d'un appareil */
/* Par contre, si un utilisateur veut supprimer un appareil enregistré, là oui, tu dois :
 supprimer son credential de ta base ou lui proposer une UI pour "gérer ses appareils" comme Google le fait */

app.listen(port, () => {
  console.log('Serveur démarré sur http://localhost:${port}');
});
