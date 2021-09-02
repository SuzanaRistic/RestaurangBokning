let express = require('express'),
    router = express.Router();

// import our schema 
let booking = require('../models/booking-schema');


// the route to make a get request that fetches all the bookings
router.route('/').get((req, res, next) => {
    booking.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
})

// the route to make a get request that fetches one of the bookings, based on its booking reference
router.route('/:booking_reference').get((req, res, next) => {
    booking.findOne({booking_reference: req.params.booking_reference},
        (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
})


// the route to make a post request that adds a booking to the database
router.route('/').post((req, res, next) => {
    booking.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//the route for editing bookings as admin, uses booking reference to find exact booking and update that particular one
router.route('/update/:booking_reference').put((req, res, next) => {
    booking.updateOne({booking_reference: req.params.booking_reference}, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('booking updated successfully !')
        }
    })
})

// the route for deleting objects in the database, uses booking reference to find exact booking and delete that particular one
router.route('/avboka/:booking_reference').delete((req, res, next) => {
    booking.deleteOne({booking_reference : req.params.booking_reference}, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;