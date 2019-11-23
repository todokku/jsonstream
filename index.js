/* * * * * * * * * * * * *
 *                       *
 *  Application setup >  *
 *                       *
 * * * * * * * * * * * * */

const express   = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    cors        = require('cors'),
    settings    = require('./core/settings.js'),
    pipes       = require('./core/pipes.js'),
    collections = require('./core/collections.js'),
    https       = require('express-http-to-https');

// Express setup.
app = express();
app.use(cors());

// Force https protocol.
app.use(https.redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// Mongoose setup.
mongoose.connect(settings.dbUrl, {useNewUrlParser: true});
db = mongoose.connection;

// Body parser setup.
app.use(bodyParser.json());

// Serve static files.
app.use('/', express.static('fe/dist'));

// Flow setup.
global.flow = new pipes.flow(mongoose);
global.flow.feed(collections.dataSet);

/* * * * * * * * * * * * *
 *                       *
 *   Endpoints setup >   *
 *                       *
 * * * * * * * * * * * * */

/**
 * Get global value.
 * HTTP method: GET.
 */
app.get('/api/get', async (req, res) => {
    let data = await global.flow.findOneIn('generals').where({_id: 'primary'});
    res.send({shape: data.shape});
});


/**
 * Get keyed value.
 * HTTP method: GET.
 */
app.get('/api/get/:key', async (req, res) => {
    let data = await global.flow.findOneIn('generals').where({_id: req.params.key});
    res.send({shape: data.shape});
});


/**
 * POST get value.
 * HTTP method: POST.
 */
app.post('/api/get', async (req, res) => {

    let _id = req.body.key || 'primary';

    let data = await global.flow.findOneIn('generals').where({_id});
    res.send({shape: data.shape});
});


/**
 * Set global value.
 * HTTP method: GET.
 */
app.get('/api/set/:value', async (req, res) => {

    await global.flow.removeOneFrom('generals').where({_id: 'primary'});

    let result = await global.flow.insertInto('generals').values({shape: req.params.value, _id: 'primary'});
    res.sendStatus(result);
});


/**
 * Set keyed value.
 * HTTP method: GET.
 */
app.get('/api/set/:key/:value', async (req, res) => {

    await global.flow.removeOneFrom('generals').where({_id: req.params.key});

    let result = await global.flow.insertInto('generals').values({shape: req.params.value, _id: req.params.key});
    res.sendStatus(result);
});


/**
 * POST set value.
 * HTTP method: POST.
 */
app.post('/api/set', async (req, res) => {

    let _id = req.body.key || 'primary';

    await global.flow.removeOneFrom('generals').where({_id});

    let result = await global.flow.insertInto('generals').values({shape: req.body.value, _id});
    res.sendStatus(result);
});


/**
 * Remove keyed value.
 * HTTP method: GET.
 */
app.get('/api/remove/:key', (req, res) => {
    global.flow.removeOneFrom('generals').where({_id: req.params.key});
    res.sendStatus(200);
});


/**
 * POST remove keyed value.
 * HTTP method: POST.
 */
app.post('/api/remove', (req, res) => {
    global.flow.removeOneFrom('generals').where({_id: req.body.key});
    res.sendStatus(200);
});


/**
 * List all data.
 * HTTP method: GET.
 */
app.get('/api/list', async (req, res) => {
    let data = await global.flow.find('generals').where({});
    res.send(data);
});


/**
 * Redirect to global value.
 */
app.get('/kick', async (req, res) => {
    let data = await global.flow.findOneIn('generals').where({_id: 'primary'});
    res.redirect(data.shape);
});


/**
 * Redirect to keyed value.
 */
app.get('/kick/:key', async (req, res) => {
    let data = await global.flow.findOneIn('generals').where({_id: req.params.key});
    res.redirect(data.shape);
});


/**
 * Start the application.
 */
app.listen(process.env.PORT || settings.port, () => {
    console.log(`Application running!`);
});
