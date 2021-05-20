const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
//routes imports
const namesRoutes = require('./routes/namesRoutes')

const app = express();
//vars set
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    req.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
    );
    next();
})
//root
app.get('/', (req, res) => {
    res.send('Server is working');
});
//Router
app.use('/api',namesRoutes)
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`)
})
module.exports = app;