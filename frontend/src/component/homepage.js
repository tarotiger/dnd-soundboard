import React from "react";
import Contact from './contact.js'
import Container from "./container.js";
import NavBar from "./navbar.js";
import Project from "./project.js";
import Title from "./title.js";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            about: false,
            contact: false
        }
    }

    switchTabs(tab) {
        let tabs = {
            home: false,
            about: false,
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
        let myPage; 
        if (this.state.home === true) {
            myText = "My Projects";
            myPage = <Project/>;
        } else if (this.state.about === true) {
            myText = "About Me";
            myPage = <div>Here are my random thoughts</div>;
        } else {
            myText = "Contact Me";
            myPage = <Contact/>;
        }
        
        return (
            <React.Fragment>
                <NavBar handleClick={this.switchTabs.bind(this)}/>
                <Title handleClick={this.switchTabs.bind(this)}/>
                <Container title={myText}>
                    {myPage}
                </Container>
            </React.Fragment>  
        )
    }
}