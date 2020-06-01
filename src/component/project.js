import React from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group'; 
import "./project.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ProjectContainer from './project-container.js';
import dnd from '../assets/dnd.png';
import uni from '../assets/uni.png';
import webdev from '../assets/webdev.png';
import homepage from '../assets/homepage.png';


const PROJ_NUM = 4; 

export default class Project extends React.Component {
    constructor(props) {
        super(props);

        let project = Array(PROJ_NUM).fill(false);
        project[0] = true; 

        this.state = {
            current: 0,
            project: project
        }
    }
    
    moveLeft() {
        // Deals with negative behaviour of modulo
        let projectNo = (((this.state.current - 1) % PROJ_NUM) + PROJ_NUM) % PROJ_NUM;
        let project = Array(PROJ_NUM).fill(false);
        project[projectNo] = true;

        this.setState({
            current: projectNo,
            project: project
        })
    }

    moveRight() {
        // Deals with negative behaviour of modulo
        let projectNo = (((this.state.current + 1) % PROJ_NUM) + PROJ_NUM) % PROJ_NUM;
        let project = Array(PROJ_NUM).fill(false);
        project[projectNo] = true;

        this.setState({
            current: projectNo,
            project: project
        })
    }

    render() {
        let page = null;
        if (this.state.project[0]) {
            page = 
            <CSSTransition
                key={0}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames="fade">
                <ProjectContainer
                    url={"https://kenxmel.github.io/dnd-soundboard/"}
                    projectUrl={"https://kenxmel.github.io/dnd-soundboard/"}
                    githubUrl={"https://github.com/kenxmel/dnd-soundboard"}
                    img={dnd}
                    key={"dnd"}
                    title={"D&D Soundboard"}
                    lang={"React, rc-slider"}
                    host={true}>
                    Soundboard for the biggest tabletop role-playing game Dungeon & Dragons.
                    Comes with an interactive and simple user interface which allows users to 
                    combine multiple tracks to create their desired ambient sound for any 
                    situation. Instant sounds which add flavour to the soundboard are also 
                    readily available. A search bar is included to allow users to easily locate 
                    their desired sounds.
                </ProjectContainer>
            </CSSTransition>
            
        } else if (this.state.project[1]) {
            page = 
            <CSSTransition
                key={1}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames="fade">
                <ProjectContainer
                    url={"https://github.com/kenxmel/web-dev-workshop"}
                    githubUrl={"https://github.com/kenxmel/web-dev-workshop"}
                    img={webdev}
                    key={"webdev"}
                    title={"Web Dev Workshop"}
                    lang={"HTML, CSS, Javascript"}
                    host={false}>
                    Web development workshop made for the Winter CSESoc Workshop for highschool 
                    students. Covers the basics of web development through a practical tutorial
                    which has students create their Olympic themed website. Students learn the 
                    interaction between the HTML DOM and Javascript as well as the basics of 
                    CSS.
                </ProjectContainer>
            </CSSTransition>
        } else if (this.state.project[2]) {
            page = 
            <CSSTransition
                key={2}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames="fade">
                <ProjectContainer
                    url={"https://github.com/kenxmel/uni-projects"}
                    githubUrl={"https://github.com/kenxmel/uni-projects"}
                    img={uni}
                    key={"uni"}
                    title={"Uni Projects"}
                    lang={"C, Javscript, Python, Bash, Perl"}
                    host={false}>
                    Condensed list of fun university projects I have done. This includes 
                    a <a href="https://github.com/kenxmel/uni-projects/tree/master/Git%20Clone">Git Clone</a> written 
                    using Bash and perl. Has basic Git functionality such as add, commit, init etc.
                    as well as the ability to create branches. Another interesting project is creating 
                    a <a href="https://github.com/kenxmel/uni-projects/tree/master/UNIX%20Shell">UNIX 
                    shell</a> using C which has the ability to pipe commands from the system environment. 
                    For more info and projects visit the github.
                </ProjectContainer>
            </CSSTransition>
        } else if (this.state.project[3]) {
            page = 
            <CSSTransition
                key={3}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames="fade">
                <ProjectContainer
                    url={"https://github.com/kenxmel/homepage"}
                    githubUrl={"https://github.com/kenxmel/homepage"}
                    img={homepage}
                    key={"homepage"}
                    title={"Homepage"}
                    lang={"React, material-ui, react-transition-group, Express"}
                    host={false}>
                    Interactive portfolio implemented with ReactJS and hosted using GitHub Pages. Uses React UI Framework material-ui
                    for a modern and mobile-friendly website. Uses the animation library react-transition-group to handle animations. Backed with Express
                    for mail handling and response
                </ProjectContainer>
            </CSSTransition>
        }
        
        return(
            <div className="container-navigator">
                <div className="container-navigator-button-left" onClick={() => this.moveLeft()}>
                    <ChevronLeftIcon/>
                </div>
                <div className="dot-container">
                    <span 
                    className={`dot ${this.state.project[0] ? "dot-active" : ""}`}>
                    </span>
                    <span 
                    className={`dot ${this.state.project[1] ? "dot-active" : ""}`}>
                    </span>
                    <span 
                    className={`dot ${this.state.project[2] ? "dot-active" : ""}`}>
                    </span>
                    <span 
                    className={`dot ${this.state.project[3] ? "dot-active" : ""}`}>
                    </span>
                </div>
                <div className="projects">
                    <TransitionGroup>
                        <SwitchTransition>  
                            {page}   
                        </SwitchTransition>
                    </TransitionGroup>  
                </div>  
                <div className="container-navigator-button-right" onClick={() => this.moveRight()}>
                    <ChevronRightIcon/>
                </div>
            </div>
        );
    }
}