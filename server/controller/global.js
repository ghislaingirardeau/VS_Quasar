export async function homeServer(req, res) {
  res.send('Hello, Im your WebAuthn server for tools shop app!');
}

export async function userConnected(req, res) {
  /* const userDb = await admin.auth().getUser('95AoiUHOIdTf4gPxgZxpVKAwjid2'); */
  res.json({ user: req.session.user /* userDb */ });
}
