import axios from 'axios';
import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Header from '../Header';
import './../../styles/Confirmation.scss';
import logo from './../../images/logo-with-background.svg';
export interface IParams {
  ref: string;
}

//Function that gives guest confirmation of booking with cofirmation id as well as possibility of cancelation
function Confirmation() {
  const history = useHistory();
  const {ref} = useParams<IParams>();
  return (
    <>
      <Header title="Tack!"></Header>
      <div className="white-container-wrapper">
        <div className="white-container-booking white-container-booking-confirmation" >
          <div className="thank-you-message">
          <h1>Tack så mycket för din bokning hos The Lazy Bee!</h1>
          <p >Din bokningsreferens är: </p>
          <p className="booking-ref">{ref}</p>
          <p >Välkommen!</p>
          
          <button className="button"
            onClick={() => {
              history.push(`/avboka/${ref}`);
            }}
          >
            {' '}
            Avboka Här!
          </button>
          <img src={logo} alt="logo" className="confirmation-logo"></img>
          </div>

        </div>
      </div>
    </>
  );
}

export default Confirmation;
