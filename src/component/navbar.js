import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div><a href="https://github.com/kenxmel">github</a></div>
                <div>blog</div>
                <div>contact me</div>
            </nav>
        );
    }
}