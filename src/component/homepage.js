import React from "react";
import Container from "./container.js";
import NavBar from "./navbar.js";
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
            myText = "My Projects";
        } else if (this.state.blog === true) {
            myText = "Random Thoughts";
        } else {
            myText = "Contact"
        }
        
        return (
            <React.Fragment>
                <NavBar handleClick={this.switchTabs.bind(this)}/>
                <Title handleClick={this.switchTabs.bind(this)}/>
                <Container title={myText}>
                    <div>{myText}</div>
                </Container>
            </React.Fragment>  
        )
    }
}