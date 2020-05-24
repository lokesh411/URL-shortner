const router = require('express').Router();
const { verify } = require('./auth');
const shorten = require('../models/url')
const appURL = process.env.APP_URL

router.post('/short_url', verify, (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.publish(false, 'Url is required', 400)
    }
    shorten.getShortenURL(url).then(data => {
        return res.publish(true, 'Success', { url: `${process.env.APP_URL}/api/url/${data}` })
    }).catch(err => {
        console.error('ERROR in shortening the URL:: ', err)
        return res.publish(false, 'Some Problem Occurred')
    })
})

router.get('/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    shorten.getLongURL(shortURL).then(data => {
        return res.redirect(`${data.originalUrl}`)
    }).catch(err => {
        console.error('ERROR occurred while shortening the URL:: ', err)
        return res.redirect(process.env.APP_URL + '/404')
    })
})

module.exports = router;
