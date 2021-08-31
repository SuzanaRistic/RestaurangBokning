import axios from "axios";
import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Header from "../Header";
import "./../../styles/Confirmation.scss";
import logo from "./../../images/logo-with-background.svg";
export interface IParams {
  ref: string;
}
function Confirmation() {
  const history = useHistory();
  const {ref} = useParams<IParams>();
  return (
    <>
      <Header title="Tack!"></Header>
      <div className="white-container-wrapper">
        <div className="white-container" style={{height: "80vh"}}>
          <p>Tack så mycket för din bokning hos The Lazy Bee!</p>
          <p>Din bokningsreferens är: {ref}</p>
          <p>Välkommen!</p>
          <img src={logo} alt="logo"></img>
          <button
            onClick={() => {
              history.push(`/avboka/${ref}`);
            }}
          >
            {" "}
            Avboka Här!
          </button>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
