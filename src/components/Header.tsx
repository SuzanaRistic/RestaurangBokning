import React from 'react'
import '../styles/Header.scss'
import { useHistory } from 'react-router-dom'
import logo from './../images/logo-with-background.svg'
interface IHeaderProps {
    title: string
}
function Header(props: IHeaderProps) {
    let history = useHistory();

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
