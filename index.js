// dev--3kekc2y.us.auth0.com - domain
// LBs1AfKC1Ikx7dLewb0lT3ds0p4hntiU - client-id
//a2GOatXLAH6mI9eFYnBm151rAsrrcV8wBiBA4ZkhqQXtOIH-1re2S4tqucKtPH0G - client secret
const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const { auth, requiresAuth } = require("express-openid-connect")

const secret = process.env.secret
const clientID = process.env.clientID

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: "http://localhost:3000",
  clientID: clientID,
  issuerBaseURL: "https://dev--3kekc2y.us.auth0.com",
}

app.use(auth(config))
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")
})

app.listen(3000, () => console.log(`http://localhost:3000`))
