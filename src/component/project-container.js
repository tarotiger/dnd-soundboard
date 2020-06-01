import React from "react";
import { Button } from "@material-ui/core"
import "./project-container.css";

export default class ProjectContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    handleClick() {
        if (this.state.show === false) {
            this.setState({
                show: true
            })
        }
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
                    <div className={`${this.state.show ? "project-summary-full" : "project-summary"}`} onClick={() => this.handleClick()}>
                        {this.props.children}
                    </div>
                    {this.props.host ? (
                        <div className="button-container">
                            <Button 
                                variant="outlined" 
                                onClick={() => window.open(this.props.projectUrl)}>
                                Try it
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={() => window.open(this.props.githubUrl)}>
                                <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            variant="outlined"
                            className="button-github-only" 
                            onClick={() => window.open(this.props.githubUrl)}>
                            <img alt="github" className="project-github" src={require("../assets/github.jpg")}></img>
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}