import React from 'react'
import './../../styles/Landing.scss'
import { Link } from 'react-router-dom'
import Header from '../Header'

function Landing() {
    return (
        <>
        <Header title="The Lazy Bee"></Header>
        
        <div className="white-container-wrap">
        <div className="white-container">
        <div className="button-container">
        <button className="meny-button">
        <Link to="/meny">Meny</Link><br></br>
        </button><br></br>
        <div><hr></hr></div>
        <button className="boka-button">
        <Link to="/boka">Boka Bord</Link></button>
        <div className="picture-container"></div>

        </div>
             </div>  
        </div>
        </>
    )
}

export default Landing
