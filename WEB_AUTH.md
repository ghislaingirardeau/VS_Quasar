# web auth

## Fichier liés à la fonctionnalité

- Front:
  - webAuthWidget.vue => visu des boutons webAuth
  - useWebAuth.ts => gère les appels API au back
  - firebase.ts => gère les appels vers firebase
- Back:
  - server: dans le dossier /Quasar => gère les responses de authentificators et son enregistrement dans la db

## Librairies

- Front:
  - Firebase SDK
  - @simplewebauthn/browser
- Back:
  - firebase-admin
  - @simplewebauthn/server

## Road map feat inside App

- User register first using firebase auth with `signWithGoogle`
- If user registered & connected, it show an icon to offer option to set fingerprint authentification
- On click to `setFingerPrint` => send connected user (in case uid is important) details to backend server & create an authentificator. This authentificator will have is own id, and inside, also a property uid to store the user uid. This authentificator should be store in the database, it's an array of users authentificators from each users
- On set fingerPrint success, the user is still connected
- The user can now logout
- If user want to connect again, he can click on log with webAuth => an authentificator (from device) is send to the backend, it compare the authentificator's id with the authentificators lists (set when register)
- If an authentifictor's id match => it's a success ! The backend use `customToken` auth, to createa token for the current user, using the uid inside the authentificator object
- the token is send back to the front & the frond use it to connect to firebase auth using `signInWithCustomToken`

## Firebase signIn with token

La méthode d'authentification de firebase custom token, utilise l'uid de `user` dans auth pour gérer la connexion. 2 cas alors possible:

- Si l'uid de user existe déjà alors `signInWithCustomToken` va faire la connexion avec celui-ci
- Si par contre l'uid n'existe pas, alors `signInWithCustomToken` va créer un nouvel utilisateur, avec l'uid utilisé. Ce user n'aura pas d'autres informations que l'uid.

C'est pourquoi, il semble plus pertinent d'ouvir la possibilité webAuth lorsqu'un utilisateur est deja connecté

## When to use

- Nécessite un backend ainsi qu'une base de données pour stocker l'authentificateur
- Intéressante comme alternative pour une authentification classique email/password
- Sinon par exemple si auth actuel est via un signWithGoogle, c'est déjà juste un popup qui s'ouvre sans aucune action supplémentaire, donc on rajouterais de la complexité à la connection, ce qui n'est pas nécessaire

## Info pour le test

- Pour le test, dés que l'on fait une modif du server, il se ré-initialise, donc on perd le `userDBCredential`. On doit alors refaire la registration coté front.
- Actuellement, pour savoir si l'utilisateur a deja `register` pour webAuth, on utilise `hasWebAuthRegister` qui est stocké dans le localstorage. Au succès de `register` celui-ci passe en `true`. Si `true` alors qu prochain clique, user se verra proposer le `login` de webAuth
