import React from "react";
import "./../../styles/Landing.scss";
import { Link } from "react-router-dom";
import Header from "../Header";
import coffee from './../../images/coffeeimage.png'
//Websites start page with links to the menu and table booking
function Landing() {
  return (
    <>
      <Header title="The Lazy Bee"></Header>

      <div className="white-container-wrap">
        <div className="white-container">
        <div className="restaurant-description"> 
           <p>
            Har klockan passerat 14.00 och du är sugen på brunch? 
           </p>
            <p>
            Kom över till The Lazy Bee, vi tar hand om dig och ger dig en fantastiskt kvälls-brunch-upplevelse!
           </p>
         </div>
          <div className="button-container">
            <div className="meny-button">
              <Link to="/meny">Meny</Link>
            </div>
            <div className="boka-button">
              <Link to="/boka">Boka</Link>
            </div>
          </div>
          
          <img src={coffee} alt="" />
        </div>
      </div>
    </>
  );
}

export default Landing;
