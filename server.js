const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const db = require('./app/config/database');
const user = require('./app/models/usermodel');

// checking if database connected
async function connectToDatabase() {
    try {
        await db.authenticate();
        console.log('Database connected...');
        await user.sync();
    } catch (err) {
        console.error(err);
    }
}
connectToDatabase();

// routes
require('./app/routes/route')(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// convert cookie to json using bodyparser
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('please enter all fields')
        }
        const user1 = await user.findOne({ where: { username: username } });

        if (!user1) { return res.status(400).send('user does not exist or password is invalid') }

        const isMatch = await bcrypt.compareSync(password, user1.password);

        if (!isMatch) { return res.status(400).send('user does not exist or password is invalid') }

        const token = jwt.sign({ id: user1.id }, process.env.JWT_SECRET);

        user1.token = token;

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        await user1.save();

        res.status(301).redirect('/calculate');
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
});

app.post('/api/register', (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('please enter all fields')
    }
    console.log(password, confirm_password);
    if (password !== confirm_password) {
        return res.status(400).send('passwords do not match');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    console.log(username, email, hash);

    user.create({
        username: username,
        email: email,
        password: hash,
        token: ''
    }).then(() => {
        res.status(301).redirect('/login');
    }).catch((err) => {
        res.status(400).send(err);
    });

});

app.get('/logout', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const token1 = await user.findOne({ where: { token: token } });
        if (!token1) {
            return res.status(301).redirect('/login');
        }
        token1.token = '';
        await token1.save();
        res.clearCookie('jwt');
        res.status(301).redirect('/');
    } catch (err) {
        console.error(err);
        res.status(301).redirect('/login');
    }
});

app.get('/calculate', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const token1 = await user.findOne({ where: { token: token } });
        if (!token1) {
            return res.status(301).redirect('/login');
        }
        res.sendFile(__dirname + '/view/calculate.html');
    } catch (err) {
        console.error(err);
        res.status(301).redirect('/login');
    }
});

// listening to port

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
