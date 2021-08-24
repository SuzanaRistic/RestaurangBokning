import React from 'react'
import './../../src/styles/Footer.scss'
import when from './../images/when.svg'
import where from './../images/where.png'
import info from './../images/info.png'

function Footer() {
    return (
        <footer>
            <div className="where-div"><img alt="where-icon"  className="info-pic" src={where}></img><br></br>
            HÄR FINNS VI <br></br>
            Forumvägen 14, <br></br>
            131 53 Nacka
            </div>
            <div className="when-div"><img alt="when-icon"  className="when-pic" src={when}></img><br></br>
            ÖPPETTIDER <br></br>
            Mån-Fre: 18:00-00:00 <br></br>
            Lör - Sön: 18:00-00:00 
            </div>
            <div className="info-div"><img alt="info-icon"  className="info-pic" src={info}></img><br></br>
            KONTAKT <br></br>
            073-593 85 51
            </div>
        </footer>
    )
}

export default Footer