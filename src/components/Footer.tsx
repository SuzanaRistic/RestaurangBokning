import React from 'react'
import { FileWatcherEventKind } from 'typescript'
import './../../src/styles/Footer.scss'

function Footer() {
    return (
        <footer>
            <div className="where-div"><img  className="info-pic" src="/images/where.png"></img><br></br>
            HÄR FINNS VI <br></br>
            Forumvägen 14, <br></br>
            131 53 Nacka
            </div>
            <div className="when-div"><img  className="when-pic" src="/images/when.svg"></img><br></br>
            ÖPPETTIDER <br></br>
            Mån-Fre: 18:00-00:00 <br></br>
            Lör - Sön: 18:00-00:00 
            </div>
            <div className="info-div"><img  className="info-pic" src="/images/info.png"></img><br></br>
            KONTAKT <br></br>
            073-593 85 51
            </div>
        </footer>
    )
}

export default Footer
