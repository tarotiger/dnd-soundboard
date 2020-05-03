import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-items">
                    <div className="navbar-tabs"><a href="https://github.com/kenxmel">github</a></div>
                    <div className="navbar-tabs" onClick={() => this.props.handleClick("blog")}>blog</div>
                    <div className="navbar-tabs" onClick={() => this.props.handleClick("contact")}>contact me</div>
                </div>
            </nav>
        );
    }
}