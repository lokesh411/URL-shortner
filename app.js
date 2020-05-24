const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const user = require('./routes/login');
const urlRouter = require('./routes/urlshort');
const cors = require('cors');
require('dotenv').config()
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/heath-check', (req, res) => {
    return res.send('Cool I am alive');
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}

app.use((req, res, next) => {
    var origin = req.headers.origin;
    // res.setHeader('Access-Control-Allow-Origin', origin);
    res.publish = (success, message, data, status) => {
        res.status(status || 200).json({ success, message: message || 'Success message', data: data || {} })
    }
    next();
})

app.use(cors(corsOptions))

app.use('/test', (req, res) => {
    return res.status(302).redirect(`${process.env.APP_URL}/register`)
})

app.use('/user', user);
app.use('/url', urlRouter);
let port = process.env.PORT;
if (!port) {
    port = 7000;
}

app.listen(port, () => { console.log(`Serving at ${port}`) })