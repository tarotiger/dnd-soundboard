import React from "react";
import "./project.css";

export default class Project extends React.Component {
    render() {
        return(
            <React.Fragment>
                <a href="http://dnd-soundboard.herokuapp.com/">
                    <div className="projects">  
                        <img alt="dnd-soundboard" className="project-image" src={require("../assets/dnd.png")}></img>
                        <div className="project-name">D&D Soundboard</div>
                    </div>
                </a>
                <a href="https://github.com/kenxmel/web-dev-workshop">
                    <div className="projects">  
                        <img alt="dnd-soundboard" className="project-image" src={require("../assets/webdev.png")}></img>
                        <div className="project-name">Web Dev Workshop</div>
                    </div>
                </a>
                <a href="https://github.com/kenxmel/uni-projects">
                    <div className="projects">  
                        <img alt="dnd-soundboard" className="project-image" src={require("../assets/uni.png")}></img>
                        <div className="project-name">Uni Projects</div>
                    </div>
                </a>
            </React.Fragment>
        );
    }
}