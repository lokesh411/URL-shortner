const router = require('express').Router();
const { User } = require('../models/user')
const { registerSchema, loginSchema } = require('../models/validations');
const { verify } = require('./auth')
const { redisSet, redisDel } = require('../models/redis')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    try {
        const payload = req.body;
        const validation = await loginSchema.validateAsync(payload)
        if (validation.error) {
            return res.sendStatus(400)
        }
        const fetchedUser = await User.findOne({ where: { email: payload.email } })
        if (!fetchedUser) {
            return res.status(400).send({ success: false, message: 'Email doesnt exist' })
        }
        const result = await bcrypt.compare(payload.password, fetchedUser.password)
        if (!result) {
            return res.status(400).send({ success: false, message: 'Password doesnt exist' })
        }
        const token = jwt.sign({ id: fetchedUser.id }, process.env.secretToken)
        await redisSet(`session:${token}`, JSON.stringify(fetchedUser), 900)
        return res.cookie('auth_token', token, {
            httpOnly: true,
        }).publish(true, 'Success', {data: token})
    } catch (e) {
        console.log('ERROR in login route::: ', e)
        return res.status(400).send({ success: false })
    }
})

router.post('/register', async (req, res) => {
    console.log('in register route ::: ', req.body)
    try {
        const validation = await registerSchema.validateAsync(req.body)
        console.log(validation)
        if (validation.error) {
            return res.sendStatus(400)
        }
        const emailExists = await User.findOne({ where: { email: req.body.email } })
        if (emailExists) {
            return res.status(400).send({ success: false, message: 'Email already exists.' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {
            name: req.body.username,
            password: hashedPassword,
            email: req.body.email
        }
        const response = await User.create(user)
        console.log('result from created user ::: ', response)
        return res.redirect(`${process.env.APP_URL}/login`)
    } catch (err) {
        console.log('in catch register route ::: ', err)
        return res.publish(false, 'Fields missing', 400)
    }
})

router.get('/logout', verify, (req, res) => {
    redisDel(`session:${req.token}`)
    return res.clearCookie('auth_token').redirect(`${process.env.APP_URL}/login`)
})

module.exports = router;
