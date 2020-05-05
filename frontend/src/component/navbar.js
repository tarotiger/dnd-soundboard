import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-items">
                    <div className="navbar-tabs" onClick={() => this.props.handleClick("home")}>Home</div>
                    <div className="navbar-tabs" onClick={() => this.props.handleClick("blog")}>Blog</div>
                    <div className="navbar-tabs" onClick={() => this.props.handleClick("about")}>About</div>
                </div>
            </nav>
        );
    }
}