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
    collections = require('./core/collections.js'),


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
flow.feed(collections.dataSet);


/**
 * Get global value.
 */

app.get('/api/get', async (req, res) => {
    let data = await flow.findOneIn('generals').where({_id: 'primary'});
    res.send({shape: data.shape});
});


/**
 * Get keyed value.
 */

app.get('/api/get/:key', async (req, res) => {
    let data = await flow.findOneIn('generals').where({_id: req.params.key});
    res.send({shape: data.shape});
});


/**
 * Set global value.
 */

app.get('/api/set/:value', async (req, res) => {

    await flow.removeOneFrom('generals').where({_id: 'primary'});

    let result = await flow.insertInto('generals').values({shape: req.params.value, _id: 'primary'});
    res.sendStatus(result);
});


/**
 * Set keyed value.
 */

app.get('/api/set/:key/:value', async (req, res) => {

    await flow.removeOneFrom('generals').where({_id: req.params.key});

    let result = await flow.insertInto('generals').values({shape: req.params.value, _id: req.params.key});
    res.sendStatus(result);
});


/**
 * Remove keyed value.
 */

app.get('/api/remove/:key', (req, res) => {
    flow.removeOneFrom('generals').where({_id: req.params.key});
    res.sendStatus(200);
});


/**
 * List all data.
 */

app.get('/api/list', async (req, res) => {
    let data = await flow.find('generals').where({});
    res.send(data);
});


/**
 * Redirect to global value.
 */

app.get('/kick', async (req, res) => {
    let data = await flow.findOneIn('generals').where({_id: 'primary'});
    res.redirect(data.shape);
});


/**
 * Redirect to keyed value.
 */

app.get('/kick/:key', async (req, res) => {
    let data = await flow.findOneIn('generals').where({_id: req.params.key});
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
    console.log(`Application running!`);
});