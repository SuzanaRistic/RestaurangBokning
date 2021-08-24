import React from 'react'
import '../styles/Header.scss'
import { Link } from 'react-router-dom'
interface IHeaderProps {
    title: string
}
function Header(props: IHeaderProps) {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src='./images/logo-with-background.svg' alt="logo" />
                </Link>
            </div>
            <div className="hero">
                <span className="title">{props.title}</span>

                <img src="./images/hero.png" alt="hero" />
            </div>
        </header>
    )
}

export default Header
