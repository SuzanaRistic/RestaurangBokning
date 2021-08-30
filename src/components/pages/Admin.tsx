import axios from "axios";
import React, {createRef, useEffect, useState} from "react";
import IBooking from "../../interfaces/IBooking";
import ReactLoading from "react-loading";
import "../../styles/Booking.scss";
import Header from "../Header";
import { useHistory } from "react-router-dom";
import './../../styles/Admin.scss'

function Admin() {
  const history = useHistory()
  const [bookingList, setBookingList] = useState<IBooking[]>();
  const [done, setDone] = useState(false);
  const now = new Date(Date.now());
  const todayIso = now.toISOString();
  const today = todayIso.slice(0, 10);
  const dateRef = createRef<HTMLInputElement>();

  function sendRequest() {
          axios
            .get("http://localhost:4000/bookings")
            .then((res) => {
              console.log(res.data);
              const bookingsForSpecDate = res.data.filter(
                (totalGuests: IBooking) => totalGuests.date === dateRef.current?.value?.toString()
              )
              setBookingList( 
                bookingsForSpecDate
              );
              setDone(true);
            })
            .catch((error) => {
              console.log(error);
            });

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
    <div className="admin-container">
      <div className="date-container">
        <h1 >Välj Datum: </h1>
        <input
          ref={dateRef}
          min={today}
          type="date"
          name="date"
          id="date"
          required
          onChange={()=> { sendRequest()}}
        />
      </div>
  
      <div className="bookingslist">
        <h1>Bokningar: </h1>
      {
       !done ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#B7AA81"}
          height={80}
          width={90}
        />
      ) : (
        bookingList?.map((filterBooking) => ( 
          
          <div className="booking-container"  >
            <div>
              {filterBooking.firstname} {filterBooking.lastname}
            </div>
            <div>Guests: {filterBooking.guests}</div>
            <div>Time:  {filterBooking.time}</div>
            <div onClick={() => {deleteBooking(filterBooking.booking_reference)}}>Avboka</div>
            <div onClick={() => {history.push(`/edit/${filterBooking.booking_reference}`)}}>Ändra Boking</div>
          </div>
        ))
      )
      }
      </div>
      
    </div>
      
    </>
  );
}

export default Admin;
