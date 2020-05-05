import React from "react";
import About from "./about.js";
import Container from "./container.js";
import NavBar from "./navbar.js";
import Project from "./project.js";
import Title from "./title.js";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            blog: false,
            about: false 
        }
    }

    switchTabs(tab) {
        let tabs = {
            home: false,
            blog: false,
            about: false
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
        } else if (this.state.blog === true) {
            myText = "Random Thoughts";
            myPage = <div>Here are my random thoughts</div>;
        } else {
            myText = "Introduction";
            myPage = <About/>;
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