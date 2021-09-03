import React from "react";
import Header from "../Header";
import bookbutton from "./../../images/bokaknapp.png";
import decoflower from "./../../images/bulletpoint 1.png";
import "./../../styles/Menu.scss";
import {Link} from "react-router-dom";

// Restaurants menu information with link to table booking 
function Menu() {
  return (
    <>
      <Header title="Meny"></Header>
      <div className="white-container-wrap">
        <div className="white-container">
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" />{" "}
              Avocadomacka
            </h3>
            <p className="food-description">
              Plommontomater, avocado och prosciutto på smörstekt krispigt
              levainbröd
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" /> Eggs
              Benedict
            </h3>
            <p className="food-description">
              Pocherat ägg med hollandaisesås, färskost och avocado på grillat bröd
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" /> Lazy Bee
              burger
            </h3>
            <p className="food-description">
              Sesamtoppat surdegsbröd med sallad, tomat, picklad rödlök, krispig
              bacon och vår fantastiska Lazy Bee-sås
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" /> Pannkakor
            </h3>
            <p className="food-description">
              •Välj mellan: Amercan pancakes, Crêpes eller Belgiska våfflor <br></br>
              •...och 3 toppings: Oreo-crunch, jordnötssmör, Ekologisk
              marmelad med kex, sylt (jorgubbs- eller äppelsylt), färsk frukttopping
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" />{" "}
              Rainbow-Choc Bowl{" "}
            </h3>
            <p className="food-description">
              Havregryn med kakao, jordnötssmör och chokladbitar, toppad med
              färska jordgubbar, blåbär, hallon, nötter och kokosflingor
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" /> Fruktbowl
            </h3>
            <p className="food-description">
              •Tropisk bowl (ananas, banan, papaya, mango toppad med vaniljkräm,
              passionfruktspuré och kokosflingor)<br></br>
              •Berry bowl (jorgubbar, blåbär, hallon, köksbär, björnbär, tranbär
              toppad med grädde, chokladflingor och nötter)<br></br>
              •Acai bowl (musli-crunch, frukt, kokos, jordnötssmör)
            </p>
          </div>
          <hr></hr>
          <div className="food-container">
            <h3 className="food-name">
              <img className="decoflower" src={decoflower} alt="" /> Grillad
              macka{" "}
            </h3>
            <p className="food-description">
              Grillat italienskt bröd med smör, tomat, mozzarela och pesto
              <br></br>
              •Välj protein: kyckling, lax, tonfisk, grillade grönsaker
            </p>
          </div>
          <Link to="/boka">
            <button className="lazy-bee-confirm-btn">
              <img src={bookbutton} alt="" />
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default Menu;
