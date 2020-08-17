import React from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import About from './about.js';
import Contact from './contact.js'
import Container from "./container.js";
import NavBar from "./navbar.js";
import Project from "./project.js";

export default class projectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: true,
            about: false,
            contact: false
        }
    }

    switchTabs(tab) {
        let tabs = {
            projects: false,
            about: false,
            contact: false
        }
        tabs[tab] = true; 

        this.setState(tabs);
    }

    render() {
        let myText;
        let myPage; 
        if (this.state.projects === true) {
            myText = "My Projects";
            myPage = 
                <CSSTransition
                    key={0}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade">
                        <Project/>
                </CSSTransition>
        } else if (this.state.about === true) {
            myText = "About Me";
            myPage = 
                <CSSTransition
                    key={1}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade">
                        <About/>
                </CSSTransition>
        } else {
            myText = "Contact Me";
            myPage = 
                <CSSTransition
                    key={2}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade">
                        <Contact/>
                </CSSTransition>
        }
        
        return (
            <React.Fragment>
                <NavBar handleClick={this.switchTabs.bind(this)}/>
                <Container title={myText}>
                    <TransitionGroup>
                        <SwitchTransition>
                            {myPage}
                        </SwitchTransition>
                    </TransitionGroup>
                </Container>
            </React.Fragment>  
        )
    }
}