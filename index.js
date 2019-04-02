/**
 * Require necessary modules.
 */

const express   = require('express'),
    bodyParser  = require('body-parser');
    mongoose    = require('mongoose'),
    cors        = require('cors'),
    settings    = require('./settings.js'),
    pipes       = require('./pipes.js'),
    schemas     = require('./schemas.js'),


/**
 * Launch app prerequisites.
 */

app = express();
app.use(cors());

mongoose.connect(settings.dbUrl, {useNewUrlParser: true});
app.use(bodyParser.json());
db = mongoose.connection;
flow = new pipes.flow(mongoose);
flow.feed(schemas.collection);


/**
 * Set ngrok url.
 */

app.get('/api/set/:domain', (req, res) => {
    flow.remove("domains").where({_id:"primary"});
    flow.insert("domains").values({shape: req.params.domain, _id: "primary"});
    res.sendStatus(200);
});


/**
 * Get current ngrok url.
 */

app.get('/api/get', (req, res) => {
    flow.findOne("domains").where({_id: 'primary'}).then((result) => {
        res.send({shape: result.shape});
    });
});


/**
 * Default endpoint.
 */

app.get('/', (req, res) => {
    res.send('Welcome to jsonstream. Enjoy your stay.');
});


/**
 * Start the application.
 */

app.listen(process.env.PORT || settings.port, () => {
    console.log(`Application runnable!`);
});