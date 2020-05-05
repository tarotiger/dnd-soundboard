import React from "react";
import "./project.css";

export default class Project extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div className="projects-container">
                    <div className="project-thumbnail">
                        <a href="https://kenxmel.github.io/dnd-soundboard/"> 
                            <img alt="dnd-soundboard" className="project-image" src={require("../assets/dnd.png")}></img>
                        </a>
                    </div>
                    <div className="project-description">
                        <div className="project-name">D&D Soundboard</div>
                        <p className="project-info">React, Heroku, Web Audio API, rc-slider</p>
                        <p className="project-summary">
                            Soundboard for the biggest tabletop role-playing game Dungeon & Dragons.
                            Comes with an interactive and simple user interface which allows users to 
                            combine multiple tracks to create their desired ambient sound for any 
                            situation. Instant sounds which add flavour to the soundboard are also 
                            readily available. A search bar is included to allow users to easily locate 
                            their desired sounds. 
                        </p>
                        <div className="button-container">
                            <button onClick={() => window.open('http://dnd-soundboard.herokuapp.com/')}>
                                Try it
                            </button>
                            <button onClick={() => window.open('https://github.com/kenxmel/dnd-soundboard')}>
                                <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="projects-container">
                    <div className="project-thumbnail">
                        <a href="https://github.com/kenxmel/web-dev-workshop"> 
                            <img alt="dnd-soundboard" className="project-image" src={require("../assets/webdev.png")}></img>
                        </a>
                    </div>
                    <div className="project-description">
                        <div className="project-name">Web Dev Workshop</div>
                        <p className="project-info">HTML, CSS, Javascript</p>
                        <p className="project-summary">
                            Web development workshop made for the Winter CSESoc Workshop for highschool 
                            students. Covers the basics of web development through a practical tutorial
                            which has students create their Olympic themed website. Students learn the 
                            interaction between the HTML DOM and Javascript as well as the basics of 
                            CSS.
                        </p>
                    </div>
                    <button className="button-github-only" onClick={() => window.open('https://github.com/kenxmel/web-dev-workshop')}>
                        <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                    </button>
                </div>
                <div className="projects-container">
                    <div className="project-thumbnail">
                        <a href="https://github.com/kenxmel/uni-projects">
                            <img alt="dnd-soundboard" className="project-image" src={require("../assets/uni.png")}></img>
                        </a>
                    </div>
                    <div className="project-description">
                        <div className="project-name">Uni Projects</div>
                        <p className="project-info">C, Javscript, Python, Bash, Perl</p>
                        <p className="project-summary">
                            Condensed list of fun university projects I have done. This includes 
                            a <a href="https://github.com/kenxmel/uni-projects/tree/master/Git%20Clone">Git Clone</a> written 
                            using Bash and perl. Has basic Git functionality such as add, commit, init etc.
                            as well as the ability to create branches. Another interesting project is creating 
                            a <a href="https://github.com/kenxmel/uni-projects/tree/master/UNIX%20Shell">UNIX 
                            shell</a> using C which has the ability to pipe commands from the system environment. 
                            For more info and projects visit the github.
                        </p>
                    </div>
                    <button className="button-github-only" onClick={() => window.open('https://github.com/kenxmel/uni-projects')}>
                        <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                    </button>
                </div>
            </React.Fragment>
        );
    }
}