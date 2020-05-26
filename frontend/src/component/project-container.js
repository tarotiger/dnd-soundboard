import React from "react";
import "./project-container.css";

export default class ProjectContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return(
            <div className={"projects-container"}>
                <div className="project-thumbnail">
                    <a href={this.props.url}> 
                        <span className="project-image-helper"></span>
                        <img alt="dnd-soundboard" className="project-image" src={this.props.img}></img>
                    </a>
                </div>
                <div className="project-description">
                    <div className="project-name">{this.props.title}</div>
                    <p className="project-info">{this.props.lang}</p>
                    <div className={`project-summary ${this.state.show ? "project-summary-full" : ""}`} onClick={() => this.handleClick()}>
                        {this.props.children}
                    </div>
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