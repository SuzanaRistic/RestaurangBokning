import axios from "axios";
import React, {createRef, useEffect, useState} from "react";
import IBooking from "../../interfaces/IBooking";
import ReactLoading from "react-loading";
import "../../styles/Booking.scss";
import Header from "../Header";

function Admin() {
  const [bookingList, setBookingList] = useState<IBooking[]>();
  const [done, setDone] = useState(false);
  const now = new Date(Date.now());
  const todayIso = now.toISOString();
  const today = todayIso.slice(0, 10);
  const dateRef = createRef<HTMLInputElement>();

  function sendRequest() {
    const totalNumberOfGuestsAndTimeList = bookingList?.filter(
      (totalGuests) => totalGuests.date === dateRef.current?.value?.toString()
    );
    setBookingList(totalNumberOfGuestsAndTimeList);
  }

  function deleteBooking(ref: string) {
    axios.delete(`http://localhost:4000/bookings/avboka/${ref}`).then(function (response) {
      console.log(response);
      axios
        .get("http://localhost:4000/bookings")
        .then((res) => {
          console.log(res.data);
          setBookingList(res.data);
          setDone(true);
  })
})};

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:4000/bookings")
        .then((res) => {
          console.log(res.data);
          setBookingList(res.data);
          setDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  }, []);

  return (
    <>
    <Header title="Admin"></Header>
      <input
        ref={dateRef}
        min={today}
        type="date"
        name="date"
        id="date"
        required
        onChange={sendRequest}
      />
      {!done ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#B7AA81"}
          height={80}
          width={90}
        />
      ) : (
        bookingList?.map((filterBooking) => (
          <>
            <div>
              {filterBooking.firstname} {filterBooking.lastname}
            </div>
            <div>Guests: {filterBooking.guests}</div>
            <div><button onClick={() => {deleteBooking(filterBooking.booking_reference)}}>Avboka</button></div>
          </>
        ))
      )}
    </>
  );
}

export default Admin;
