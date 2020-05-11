const router = require('express').Router();
const { verify } = require('./auth');
const shorten = require('../models/url')

router.post('/short_url', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.publish(false, 'Url is required', 400)
    }

})

module.exports = router;
