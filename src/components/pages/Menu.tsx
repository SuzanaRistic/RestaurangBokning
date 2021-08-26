import React from 'react'
import Header from '../Header'
import bookbutton from '/Users/suzanaristic/Desktop/Restaurang/RestaurangBokning/src/images/bokaknapp.png'
import decoflower from './../../images/bulletpoint 1.png'
import './../../styles/Menu.scss'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <>
            <Header title="Meny"></Header>
        <div className="white-container-wrap">
        <div className="white-container"> 
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Avocadomacka</h3>
        <p className="food-description">Babyplommon tomater, avocado och parmaskinka på smörstekt krispig levain bröd</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Eggs Benedict</h3>
        <p className="food-description">Pocherade ägg med hollandaise sås på en grillad bröd med färsk ost på</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Burger La Bee</h3>
        <p className="food-description">Sesamtoppad bröd med sallad, tomat, karmeliserad lök, krispig bacon och våran egna La Bee sås</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Pannkakor</h3>
        <p className="food-description">•Välj mellan olika typer: Amerikanska, Crapes eller Våfflor <br></br>
        •Välj mellan olika toppings: Oreo, Nutella, Ekologisk
        marmelad med kex, Frukt kompott (Jorgubb eller Äpple)</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Rainbow-Choc Bowl </h3>
        <p className="food-description">Havregryn med kakao, jordnötssmör och chokladbitar, 
        toppad med färsta jordgubbar, blåbär, hallön, nöter och kokosflingor</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Fruktbowl</h3>
        <p className="food-description">•Tropisk bowl (ananas, banan, papaya, mango toppad med vaniljkräm, passionfrukt pure och kokosflingor)<br></br>
        •Berry bowl (jorgubbar, blåbär, hallon, köksbär,björnbär, tränbär toppad med grädde, chokladflingor och nötter)<br></br>
        •Acai bowl (musli crunch, frukt, kokos, jordnötssmör)</p>
        </div>
        <hr></hr>
        <div className="food-container">
        <h3 className="food-name"><img className="decoflower" src={decoflower} alt=""/> Grilladmacka </h3>
        <p className="food-description">Grillad italiensk bröd med smör, tomat, mozzarela, pesto<br></br>
        •Välj protein: kyckling, lax, tonfisk, veggie</p>
        </div>
        <Link to="/boka"><button className="book-btn"><img src={bookbutton} alt="" /></button></Link>
        </div>  
        </div>

        </>
    )
}

export default Menu
