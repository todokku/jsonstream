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

// Express setup.
app = express();
app.use(cors());

// Mongoose setup.
mongoose.connect(settings.dbUrl, {useNewUrlParser: true});
db = mongoose.connection;

//Body parser setup.
app.use(bodyParser.json());

// Flow setup.
flow = new pipes.flow(mongoose);
flow.feed(schemas.collection);


/**
 * Set ngrok url.
 */

app.get('/api/set/:domain', (req, res) => {
    flow.remove('domains').where({_id: 'primary'});
    flow.insert('domains').values({shape: req.params.domain, _id: 'primary'});
    res.sendStatus(200);
});


/**
 * Set ngrok url with key.
 */

app.get('/api/set/:domain/:key', (req, res) => {
    flow.insert('domains').values({shape: req.params.domain, _id: req.params.key});
    res.sendStatus(200);
});



/**
 * Get current ngrok url.
 */

app.get('/api/get', async (req, res) => {
    let data = await flow.findOne('domains').where({_id: 'primary'});
    res.send({shape: data.shape});
});


/**
 * Redirect user to url by key.
 */

app.get('/api/delete/:key', (req, res) => {
    flow.remove('domains').where({_id: req.params.key});
    res.sendStatus(200);
});


/**
 * Redirect user to url by key.
 */

app.get('/api/list', async (req, res) => {
    let data = await flow.find('domains').where({});
    res.send(data);
});


/**
 * Redirect user to current url.
 */

app.get('/kick', async (req, res) => {
    let data = await flow.findOne('domains').where({_id: 'primary'});
    res.redirect(data.shape);
});


/**
 * Redirect user to url by key.
 */

app.get('/kick/:key', async (req, res) => {
    let data = await flow.findOne('domains').where({_id: req.params.key});
    res.redirect(data.shape);
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