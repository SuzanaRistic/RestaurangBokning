import React from 'react'
import '../styles/Header.scss'
import { Link } from 'react-router-dom'
import logo from './../images/logo-with-background.svg'
interface IHeaderProps {
    title: string
}
function Header(props: IHeaderProps) {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="hero">
                <span className="title">{props.title}</span>
            </div>
        </header>
    )
}

export default Header
