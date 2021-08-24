let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let booking = require('../models/booking-schema');


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

router.route('/edit/:id').get((req, res, next) => {
    booking.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/update/:id').put((req, res, next) => {
    booking.findByIdAndUpdate(req.params.id, {
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

router.route('/delete/:booking_reference').delete((req, res, next) => {
    booking.deleteOne({booking_reference : req.params.id}, (error, data) => {
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