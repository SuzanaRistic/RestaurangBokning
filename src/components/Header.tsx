import React from 'react'
import '../styles/Header.scss'
import { useHistory } from 'react-router-dom'
import logo from './../images/logo-with-background.svg'


interface IHeaderProps {
    title: string
}
function Header(props: IHeaderProps) {
    let history = useHistory();

    //to send user to landingpage if they click the logo
    function handleClick() {
        history.push("/");
    }
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="logo"   onClick={() => { handleClick() }}/>
            </div>
            <div className="hero">
                <span className="title">{props.title}</span>
            </div>
        </header>
    )
}

export default Header
