const router = require('express').Router();

/**
 * Get sense by name
 * Optional param: range to refine search
 */
router.get('/get/senses/:name/:range*?', (req, res) => {
    //TODO write this
});

/**
 * Post a sense to the database
 */
router.post('/post', (req, res) => {
    //TODO write this
});

module.exports = router;