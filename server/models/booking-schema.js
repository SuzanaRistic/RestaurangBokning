// Booking schema for bookings made on website that will be saved to database
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
    date: String,
    time: String, 
},{ collection : 'Bookings' })
module.exports = mongoose.model('Booking', bookingSchema)