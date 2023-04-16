const express = require('express'); //notre framework de développement web
const cors = require('cors'); //servira à connecter le front et le back end
//const dotenv = require('dotenv'); 
//sert aux variables d'environnement .env 
const mongoose = require('mongoose'); //la base pour gerer les modeles des connections de la BDD
const bodyParser = require('body-parser'); // sert à récupérer et parser les String de l'API

const app = express();

const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Serveur Supernova en ligne.');
    });

app.listen(3000, () => {
    console.log('Le serveur tourne sur notre MegaExtraGigaSupra Supernova-Server');
    });

mongoose.connect('mongodb+srv://supernova_admin:technoduweb11@supernova.zuf8o3e.mongodb.net/supernova', { //l'url secret de notre BDD
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log('Connecté à la base de données via MongoDB.');
})

.catch((err) => {
    console.error('La connexion à la base de données MongoDB à échoué.', err);
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
