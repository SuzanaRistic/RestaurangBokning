import IBooking from '../interfaces/IBooking';

//import the booking request from BookingForm with requested date and number of guests
export function findTables (bookingList: IBooking[], date: string) {
  //map out all guests and the booked times for the requested day and place them 
  //in a variable, here called "totalNumberOfGuestsAndTimeList"
  const totalNumberOfGuestsAndTimeList = bookingList
  ?.filter((totalGuests) => totalGuests.date === date)
  .map((filteredGuests) => ({
    time: filteredGuests.time,
    guests: filteredGuests.guests,
  }));

//take the above created variable (an array of objects) with the number of guests and their 
//booked time for the requested booking date, and sum up the total number of guests for
// that specific date. Place this in a variable her called "totalNumberOfGuestsForRequestedDate"
  const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsAndTimeList?.map(
    (filterGuests) => filterGuests.guests
  ).reduce(
    (a, b) => a + b,
    0
  );

//filter out all the bookings for the first time slot, 18:00
  const tablesForSlotOne = totalNumberOfGuestsAndTimeList
    ?.filter(
      (totalNumberOfGuestsAndTimeListFiltered) =>
        totalNumberOfGuestsAndTimeListFiltered.time === "18:00"
    )
// calculate the number of tables for the first time slot 
    .map((filterSlotOne) => Math.ceil(filterSlotOne.guests / 6))
    .reduce((a, b) => a + b, 0);

// repeat the above steps but for the second time slot, at 21:00
  const tablesForSlotTwo = totalNumberOfGuestsAndTimeList
    ?.filter(
      (totalNumberOfGuestsAndTimeListFiltered) =>
        totalNumberOfGuestsAndTimeListFiltered.time === "21:00"
    )
    .map((filterSlotTwo) => Math.ceil(filterSlotTwo.guests / 6))
    .reduce((a, b) => a + b, 0);
    
    //return the number of tables for each time slot as well ass the total 
    // number of guests for the requested date 
    return {tablesForSlotOne , tablesForSlotTwo, totalNumberOfGuestsForRequestedDate};
     
}