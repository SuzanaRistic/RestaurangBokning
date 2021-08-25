import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import './../../styles/confirmation.scss'
interface IParams {
	ref: string;
}
function Confirmation() {
    const { ref } = useParams<IParams>();
    const namn = 'Gästnamn'
    return (
        <>
            <Header title="Tack!"></Header>
            <div className="white-container-wrapper">
                <div className="white-container" style={{height: '80vh'}}>
                    <p>Tack {namn},  för din bokning hos The Lazy Bee!</p>
                    <p>Du har ett bord den {} kl {}, för {} personer</p>
                    <p>Din bokningsreferens är: {ref}</p>
                    <p>Välkommen!</p>
                </div>
            </div>
        </>
    )
}

export default Confirmation
