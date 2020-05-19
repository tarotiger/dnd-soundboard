import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            home: true,
            about: false,
            contact: false
        }
    }

    handleClick(tab) {
        this.props.handleClick(tab);

        if (tab === "home") {
            this.setState({
                home: true,
                about: false,
                contact: false
            })
        } else if (tab === "about") {
            this.setState({
                home: false,
                about: true,
                contact: false 
            })
        } else {
            this.setState({
                home: false,
                about: false, 
                contact: true
            })
        }
    }

    render() {
        return (
            <nav className="navbar">
                <div className="navbar-items">
                    <div className={"navbar-tabs" + (this.state.home ? " active-tab" : "")} onClick={() => this.handleClick("home")}>HOME</div>
                    <div className={"navbar-tabs" + (this.state.about ? " active-tab" : "")} onClick={() => this.handleClick("about")}>ABOUT</div>
                    <div className={"navbar-tabs" + (this.state.contact ? " active-tab" : "")} onClick={() => this.handleClick("contact")}>CONTACT</div>
                </div>
            </nav>
        );
    }
}