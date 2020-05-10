import React from "react";
import "./project-container.css";

export default class ProjectContainer extends React.Component {
    render() {
        return(
            <div className="projects-container">
                <div className="project-thumbnail">
                    <a href={this.props.url}> 
                        <img alt="dnd-soundboard" className="project-image" src={this.props.img}></img>
                    </a>
                </div>
                <div className="project-description">
                    <div className="project-name">{this.props.title}</div>
                    <p className="project-info">{this.props.lang}</p>
                    <p className="project-summary">
                        {this.props.children}
                    </p>
                    {this.props.host ? (
                        <div className="button-container">
                            <button onClick={() => window.open(this.props.projectUrl)}>
                                Try it
                            </button>
                            <button onClick={() => window.open(this.props.githubUrl)}>
                                <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                            </button>
                        </div>
                    ) : (
                        <button className="button-github-only" onClick={() => window.open(this.props.githubUrl)}>
                            <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                        </button>
                    )}
                </div>
            </div>
        );
    }
}