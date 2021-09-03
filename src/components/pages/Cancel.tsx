import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from '../Header';
import {IParams} from './Confirmation'
import logo from './../../images/lazy-logo-white.svg'
import{ init, send } from 'emailjs-com';

// Booking cancelation function that allows cancelation and deletes booking from database
init("user_OHyxXpSu4H1rj4LKQ2q7L");
function Cancel() {
    const [cancelled, setCancelled] = useState(false);
    const history = useHistory();
    const { ref } = useParams<IParams>();
    function cancelTable () {
        axios.get(`http://localhost:4000/bookings/${ref}`)
        .then(function (response) {
            send('service_1t779ze', 'template_23ykxwx', {to_email: response.data.email})
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios.delete(`http://localhost:4000/bookings/delete/${ref}`)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        setCancelled(true);
        
        });
    }
    return (
        <div>
            <Header title="Avboka"></Header>
            {!cancelled && 
                 <>
                 <h1>Är du säker på att du vill avboka?</h1>
                 <div style={{flexDirection: 'row', padding: '3em'}} >
                     <button style={{color: 'inherit'}} onClick={cancelTable}>Ja</button>
                     <button style={{color: 'inherit'}} onClick={() => {history.push('/')}}>Nej</button>
                 </div>
                 </>
            }
            {cancelled && 
                <>
                <h1>Tråkigt att du behövde avboka</h1>
                <h1>Om du vill boka nytt bord går det bra att göra <Link style={{color: 'inherit'}} to="/boka">här!</Link></h1>
                <h1>Välkommen Tillbaka!</h1>
                <img style={{width: '10em', padding: '2em'}} src={logo} alt="logo"></img>
                </>
            }
               
            
        </div>
    )
}

export default Cancel
