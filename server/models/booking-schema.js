const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bookingSchema = new Schema({
    phonenumber: String,
    lastname: String,
    firstname: String,
    email: String,
    guests: Number,
    booking_reference: String,
    message: String,
    date: Date,
    time: String, 
},{ collection : 'Bookings' })
module.exports = mongoose.model('Booking', bookingSchema)