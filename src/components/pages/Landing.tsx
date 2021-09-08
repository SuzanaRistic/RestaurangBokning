import React from "react";
import "./../../styles/Landing.scss";
import { Link } from "react-router-dom";
import Header from "../Header";

//Websites start page with links to the menu and table booking
function Landing() {
  return (
    <>
      <Header title="The Lazy Bee"></Header>

      <div className="white-container-wrap">
        <div className="white-container">
          <div className="restaurant-description"> 
           <h3>
            Klockan har passerat 14.00 och du är sugen på brunch. 
           </h3>
            <h3>
            Kom över till The Lazy Bee, vi tar hand om dig och ger dig en fantastiskt kvälls-brunch-upplevelse!
           </h3>
         </div>
          <div className="button-container">
            <div className="meny-button">
              <Link to="/meny">Meny</Link>
            </div>
              <hr></hr>
            <div className="boka-button">
              <Link to="/boka">Boka</Link>
            </div>
          </div>
          <div className="picture-container"></div>
        </div>
      </div>
    </>
  );
}

export default Landing;
