import IBooking from '../interfaces/IBooking';

export function findTables (bookingList: IBooking[], date: string) {
  const totalNumberOfGuestsAndTimeList = bookingList
  ?.filter((totalGuests) => totalGuests.date === date)
  .map((filteredGuests) => ({
    time: filteredGuests.time,
    guests: filteredGuests.guests,
  }));

  const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsAndTimeList?.map(
    (filterGuests) => filterGuests.guests
  ).reduce(
    (a, b) => a + b,
    0
  );



  const tablesForSlotOne = totalNumberOfGuestsAndTimeList
    ?.filter(
      (totalNumberOfGuestsAndTimeListFiltered) =>
        totalNumberOfGuestsAndTimeListFiltered.time === "18:00"
    )
    .map((filterSlotOne) => Math.ceil(filterSlotOne.guests / 6))
    .reduce((a, b) => a + b, 0);

  const tablesForSlotTwo = totalNumberOfGuestsAndTimeList
    ?.filter(
      (totalNumberOfGuestsAndTimeListFiltered) =>
        totalNumberOfGuestsAndTimeListFiltered.time === "21:00"
    )
    .map((filterSlotTwo) => Math.ceil(filterSlotTwo.guests / 6))
    .reduce((a, b) => a + b, 0);
    
    return {tablesForSlotOne , tablesForSlotTwo, totalNumberOfGuestsForRequestedDate};
     
}