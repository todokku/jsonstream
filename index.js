/**
 * Require necessary modules.
 */

const express   = require('express'),
    bodyParser  = require('body-parser');
    mongoose    = require('mongoose'),
    cors        = require('cors'),
    serveStatic = require('serve-static')
    settings    = require('./core/settings.js'),
    pipes       = require('./core/pipes.js'),
    schemas     = require('./core/schemas.js'),


/**
 * Launch app prerequisites.
 */

// Express setup.
app = express();
app.use(cors());

// Mongoose setup.
mongoose.connect(settings.dbUrl, {useNewUrlParser: true});
db = mongoose.connection;

// Body parser setup.
app.use(bodyParser.json());

// Servestatic setup.
app.use(express.static('fe/dist'));

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
 * Get current ngrok url.
 */

app.get('/api/get/:key', async (req, res) => {
    let data = await flow.findOne('domains').where({_id: req.params.key});
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
 * Root path.
 */

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});


/**
 * Start the application.
 */

app.listen(process.env.PORT || settings.port, () => {
    console.log(`Application runnable!`);
});