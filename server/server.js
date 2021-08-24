require('dotenv').config()
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const bookingRoute = require('../server/routes/booking.routes')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/bookings', bookingRoute)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
// Error Handling
app.use((req, res, next) => {
    // eslint-disable-next-line no-undef
    next(res);
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

