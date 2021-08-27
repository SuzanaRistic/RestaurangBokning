import React, {createRef, useEffect, useState} from "react";
import "./../styles/Booking.scss";
import gavidare from "./../images/gå vidare med bokning knapp.svg";
import IBooking from "../interfaces/IBooking";
import axios from "axios";
import GuestComponent from "./GuestForm";

function BookingForm() {

  const [time, setTime] = useState("18:00");
  const [toggleTimeBtns, setToggleTimeBtns] = useState(true);
  const [showFirst, setShowFirst] = useState(true);
  const [bookingList, setBookingList] = useState<IBooking[]>();
  const [dateGuestTimeInfo, setDateGuestTimeInfo] = useState({
    guests: 0,
    time: "",
    date: "",
  });
  const [requestedBooking, setRequestedBooking] = useState({
    guests: 1,
    date: "",
  });
  const [guests, setGuests] = useState({
    guestsForRequestedDate: 0,
    guestsTOne: 0,
    guestsTTwo: 0,
  });
  const [buttonVariable, setButtonVariable] = useState(<div></div>);

  const guestsRef = createRef<HTMLSelectElement>();
  const dateRef = createRef<HTMLInputElement>();

  function sendFirstPart() {
    setDateGuestTimeInfo({
      guests: Number(guestsRef.current?.value) || 0,
      date: dateRef.current?.value?.toString() || "",
      time: time,
    });
    setShowFirst(false);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/bookings")
      .then((res) => {
        console.log(res.data);
        setBookingList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function sendRequest() {
    setRequestedBooking({
      guests: Number(guestsRef.current?.value),
      date: dateRef.current?.value?.toString() || "",
    });
  }

  useEffect(() => {
    console.log(
      "Number of guests: ",
      requestedBooking?.guests,
      "Date requested: ",
      requestedBooking?.date
    );

    const totalNumberOfGuestsAndTimeList = bookingList
      ?.filter((totalGuests) => totalGuests.date === requestedBooking?.date)
      .map((filteredGuests) => ({
        time: filteredGuests.time,
        guests: filteredGuests.guests,
      }));

    const totalNumberOfGuestsList = totalNumberOfGuestsAndTimeList?.map(
      (filterGuests) => filterGuests.guests
    );

    const totalNumberOfGuestsForRequestedDate = totalNumberOfGuestsList?.reduce(
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

    setGuests({
      guestsForRequestedDate: totalNumberOfGuestsForRequestedDate || 0,
      guestsTOne: tablesForSlotOne || 0,
      guestsTTwo: tablesForSlotTwo || 0,
    });
    
    
    setDateGuestTimeInfo({
        guests: Number(guestsRef.current?.value) || 0,
        date: dateRef.current?.value?.toString() || "",
        time: time,
      });
  }, [requestedBooking]);

  useEffect(() => {
    if (
      Math.ceil(guests.guestsForRequestedDate / 6) +  Math.ceil(requestedBooking.guests / 6) >=
      30
    ) {
      setButtonVariable(
        <>
          <div className="time-btns">
           
          </div>
          <p>Tyvärr så är vi fullbokade denna kväll!</p>
        </>
      );
    } else if (
      guests.guestsTOne + Math.ceil(requestedBooking.guests / 6) >=
      15
    ) {
      setTime("21:00");
      setButtonVariable(
        <>
          <div className="time-btns">
            
            <button className="time-btn">21:00</button>
          </div>
          <p>Det finns endast lediga bord kl. 21:00 denna kväll</p>
        </>

      );
    } else if (
      guests.guestsTTwo + Math.ceil(requestedBooking.guests / 6) >=
      15
    ) {
      setTime("18:00");
      setButtonVariable(
        <>
          <div className="time-btns">
            <button className="time-btn"> 18:00</button>
          </div>
          <p>Det finns endast lediga bord kl. 18:00 denna kväll</p>
        </>
      );
    } else {
        setButtonVariable(
           <>
            <div className="time-btns">
                  <button className="time-btn" onClick={()=> {setTime('18:00')} }>18:00</button>
                  <button className="time-btn" onClick={()=> {setTime('21:00')} } >21:00</button>
                </div>
            <p>Välj en ledig tid för ditt besök</p>
            </> 
             
        );
      } 

  }, [guests])

  return (
    <>
      {showFirst && (
        <div className="white-container-booking">
          <label htmlFor="guests">Antal Gäster</label>
          <select name="guests" id="guests" ref={guestsRef} required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
          <div className="date-time-wrap">
            <div>
              <label htmlFor="date">Datum</label>
              <input
                ref={dateRef}
                type="date"
                name="date"
                id="date"
                required
                onChange={sendRequest}
              />
              <p>Välj önskat besöksdatum</p>
            </div>
            <div>
              <label htmlFor="tid">Tid</label>
              {buttonVariable}
            </div>
          </div>
          {dateGuestTimeInfo.date.length < 1 || dateGuestTimeInfo.guests < 1 || dateGuestTimeInfo.time.length < 1 ?
          <button
            className="confirm-btn"
          >
            <img src={gavidare} alt="" />
          </button> :
           <button
            className="confirm-btn"
            onClick={(e) => {
              e.preventDefault();
              sendFirstPart();
            } } disabled={false}

          >
            <img src={gavidare} alt="" />
          </button>}
        </div>
      )}

      {!showFirst && (
        <div className="white-container-booking">
          <div className="booking-info-container">
            <p>
              Antal: <br></br> {dateGuestTimeInfo.guests}
            </p>
            <p>
              Datum: <br></br> {dateGuestTimeInfo.date}
            </p>
            <p>
              Tid: <br></br> {dateGuestTimeInfo.time}
            </p>
          </div>
          <GuestComponent
            time={dateGuestTimeInfo.time}
            date={dateGuestTimeInfo.date}
            guests={dateGuestTimeInfo.guests}
          ></GuestComponent>
        </div>
      )}
    </>
  );
}

export default BookingForm;
