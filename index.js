const express = require('express');
const exphbs  = require('express-handlebars');
const db = require('./src/db/sync');


function renderCard(res, data) {
    res.render('card', data)
}

let hbsInstance = exphbs.create({
    extname: 'hbs',
    helpers: require('./src/helpers').helpers()
});

const app = express();

app.set('view engine','hbs');
app.engine('hbs',hbsInstance.engine);

app.set('views', './src/views');

app.use('/images', express.static('./src/images'));
app.use('/css', express.static('./src/css'));

app.get('/', (req, res) => {
    renderCard(res, {
        name: "Name",
        attitude: "Attitude",
        clazz: "Class",
        challenge: 1,

        movement: 9,
        ini: +4,
        gab: +3,
        xp: 200,

        stats: {
            ac: 16,
            hp: 27,
            str: 1,
            dex: 2,
            con: 3,
            int: 4,
            wis: 5,
            cha: 6
        },

        kmb: 1,
        kmv: 1,

        fertigkeiten: [
            {
                name: 'Fertigkeit 1',
                mod: +3
            }
        ],
        talente: "Eins, Zwei",
        sinne: "Keine :(",
        sprachen: "Deutsch",
        rws: {
            wil: +3,
            zaeh: +2,
            ref: +1
        },

        attacks: [
            {
                name: "I bims",
                description: "ein Attacke"
            }
        ],

        actions: [
            {
                name: "I bims",
                description: "ein Aktion"
            }
        ],

        image: "Creature.png"

    });
});

app.post('/', (req, res) => {
    renderCard(res, req.body);
});

/**
 * Returns all cards with full data of name 'name'
 * Optional param: Challenge rating to refine search
 */
app.get('/get/cards/:name/:challenge*?',(req, res) => {
    //TODO write this
});

/**
 * Get language by name
 */
app.get('/get/languages/:name', (req, res) => {
    //TODO write this
});

/**
 * Get sense by name
 * Optional param: range to refine search
 */
app.get('/get/senses/:name/:range*?', (req, res) => {
    //TODO write this
});

/**
 * Get skill by name
 */
app.get('/get/skills/:name', (req, res) => {
    //TODO write this
});

/**
 * Get talent by name
 */
app.get('/get/talent/:name', (req, res) => {
    //TODO write this
});

/**
 *  Post a card to the database
 */
app.post('/post/card', (req, res) => {
    //TODO write this
});

/**
 * Posts a card to the database
 */
app.post('/post/skill', (req, res) => {
    //TODO write this
});

/**
 * Post a language to the database
 */
app.post('/post/language', (req, res) => {
    //TODO write this
});

/**
 * Post a sense to the database
 */
app.post('/post/sense', (req, res) => {
    //TODO write this
});

/**
 * Post a talent to the database
 */
app.post('/post/talent', (req, res) => {
    //TODO write this
});



db.dbSync();
console.log("listening on 3000");
app.listen(3000);