import express from 'express';
import { userConnected, homeServer } from './controller/global.js';
import { webAuth } from './controller/webAuth.js';
const router = express.Router();

router.get('/', homeServer);

/* REGISTRATION TO WEBAUTH*/

/* Need user to be connected to register */
// Ou oblige à la 1ere connection de se connecter via firebase/google => user aura alors forcément un uid
// Une fois la 1ere connection réussi, on propose coté front à l'utilisateur de permettre la connexion via webAuth (évite le popup google)
// ainsi on aura uid de user qui correspond à son uid de firebase auth

/* 1- Registration  */
router.post(
  '/auth/generate-registration-options',
  webAuth.generateRegistration,
);

/* 2- Registration  */
router.post('/auth/verify-registration', webAuth.verifyRegistration);

/* 1- Authentication */
router.get(
  '/auth/generate-authentication-options',
  webAuth.generateAuthentication,
);
/* 2- Authentication */
router.post('/auth/verify-authentication', webAuth.verifyAuthentication);

/* LOGOUT */
router.get('/logout', webAuth.logout);
/* WebAuthn sert uniquement à authentifier un utilisateur en prouvant qu’il possède une clé privée via un appareil biométrique.
 Mais la session ou le token d'authentification reste ce qui maintient l’état connecté, comme dans un login classique. 
 Donc pas de cookie 'connect.sid' => pas de connection
 */

/* Middleware control if user connected */
router.get('/me', userConnected);

export default router;
