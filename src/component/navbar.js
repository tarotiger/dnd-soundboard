import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-items">
                    <div><a href="https://github.com/kenxmel">github</a></div>
                    <div onClick={() => this.props.handleClick("blog")}>blog</div>
                    <div onClick={() => this.props.handleClick("contact")}>contact me</div>
                </div>
            </nav>
        );
    }
}