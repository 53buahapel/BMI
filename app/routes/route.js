const staticpath = 'C:\\Users\\rafim\\Desktop\\bew\\BMI\\views\\'


module.exports = function (app) {

    app.get('/', (req, res) => {
        res.sendFile(staticpath + 'index.html');
    });

    app.get('/login', (req, res) => {
        res.sendFile(staticpath + 'login.html');
    });

    app.get('/register', (req, res) => {
        res.sendFile(staticpath + 'register.html');
    });

}