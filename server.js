const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const db = require("./service/Bureau")
const route =require("./route/Bureau")

////Entity//////////
const modelresult =require("./model/resultat")
const modeluser =require("./model/User")
const modelbureau =require("./model/Bureau")
const modelcandidat =require("./model/Candidat")



////////////
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



const Bureau = require('./route/Bureau');

app.use('/bureau', Bureau);

const Candidat = require('./route/Candidat');

app.use('/candidat', Candidat);


const user = require('./route/User');

app.use('/user', user);




const server =require ('http').createServer(app);
const io = require('socket.io')(server);


server.listen(port,'0.0.0.0', () => {
  console.log(`server running on port ${port}`);
});