var router = require('express').Router();

/**
 * Returns all cards with full data of name 'name'
 * Optional param: Challenge rating to refine search
 */
router.get('/get/:name/:challenge*?',(req, res) => {
    //TODO write this
});


/**
 *  Post a card to the database
 */
router.post('/post', (req, res) => {
    //TODO write this
});

module.exports = router;