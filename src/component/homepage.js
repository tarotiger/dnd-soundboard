import React from "react";
import NavBar from "./navbar.js"
import Title from "./title.js";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            blog: false,
            contact: false 
        }
    }

    switchTabs(tab) {
        let tabs = {
            home: false,
            blog: false,
            contact: false
        }
        tabs[tab] = true; 

        console.log(tabs);
        console.log("Tabs is", tab);

        this.setState(tabs);
    }

    render() {
        // TODO: Test case 
        let myText;
        if (this.state.home === true) {
            myText = "I am currently at home";
        } else if (this.state.blog === true) {
            myText = "I am currently at the blog";
        } else {
            myText = "I am currently at contact"
        }
        
        return (
            <React.Fragment>
                <NavBar handleClick={this.switchTabs.bind(this)}/>
                <Title handleClick={this.switchTabs.bind(this)}/>
                <div>{myText}</div>
            </React.Fragment>  
        )
    }
}