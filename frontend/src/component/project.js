import React from "react";
import "./project.css";
import ProjectContainer from './project-container.js';
import dnd from '../assets/dnd.png';
import webdev from '../assets/webdev.png';
import uni from '../assets/uni.png';

export default class Project extends React.Component {
    render() {
        return(
            <React.Fragment>
                <ProjectContainer
                    url={"https://kenxmel.github.io/dnd-soundboard/"}
                    projectUrl={"http://dnd-soundboard.herokuapp.com/"}
                    githubUrl={"https://github.com/kenxmel/dnd-soundboard"}
                    img={dnd}
                    title={"D&D Soundboard"}
                    lang={"React, Heroku, Web Audio API, rc-slider"}
                    host={true}>
                    Soundboard for the biggest tabletop role-playing game Dungeon & Dragons.
                    Comes with an interactive and simple user interface which allows users to 
                    combine multiple tracks to create their desired ambient sound for any 
                    situation. Instant sounds which add flavour to the soundboard are also 
                    readily available. A search bar is included to allow users to easily locate 
                    their desired sounds. 
                </ProjectContainer>
                <ProjectContainer
                    url={"https://github.com/kenxmel/web-dev-workshop"}
                    githubUrl={"https://github.com/kenxmel/web-dev-workshop"}
                    img={webdev}
                    title={"Web Dev Workshop"}
                    lang={"HTML, CSS, Javascript"}
                    host={false}>
                    Web development workshop made for the Winter CSESoc Workshop for highschool 
                    students. Covers the basics of web development through a practical tutorial
                    which has students create their Olympic themed website. Students learn the 
                    interaction between the HTML DOM and Javascript as well as the basics of 
                    CSS.
                </ProjectContainer>
                <ProjectContainer
                    url={"https://github.com/kenxmel/uni-projects"}
                    githubUrl={"https://github.com/kenxmel/uni-projects"}
                    img={uni}
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
                
            </React.Fragment>
        );
    }
}