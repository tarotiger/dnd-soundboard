import React from "react";
import "./about.css";

export default class About extends React.Component {
    constructor(props) {
        super(props);

        let state = {
            image: 0
        }
    }

    render() {
        return(
            <React.Fragment>
                <p className="about-text">
                    Hey there, I'm studying Computer Science at the University of New South Wales. This is me 
                    below:
                </p>
                <img alt="about-me" className="about-img" src={require("../assets/about.PNG")}></img>
                <p className="about-text">
                    My hobbies are all over the place, I enjoy a good dose of video games especially those 
                    of the RPG genre as well as boardgames. Coronavirus has forced me to pick up running to 
                    maintain some semblence of fitness.
                    Currently at UNSW, I am a Workshop Developer of CSESoc Compclub Subcommittee which organises 
                    and creates workshops for high school students who are interested in learning about coding. 
                    It has been a rewarding experience being able to give back what I have learnt and seeing 
                    others also share the same passion as me. 
                </p> 
            </React.Fragment>
        );
    }
}