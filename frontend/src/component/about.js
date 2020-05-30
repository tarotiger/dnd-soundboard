import React from "react";
import "typeface-roboto";
import "./about.css";
import { Typography } from "@material-ui/core";

export default class About extends React.Component {
    render() {
        return(
            <React.Fragment>
                <img alt="about-me" className="about-img" src={require("../assets/placeholder.jpg")}></img>
                <Typography
                    variant="h5">
                    Introduction
                </Typography>
                <br></br>
                <Typography 
                    className="about-text"
                    variant="body1">
                    Hi, I 'm Kenneth Lu. I am currently completing my education in Computer Science at the University of New South Wales.
                </Typography>
                <br></br>
                <Typography
                    variant="h5">
                        What I enjoy
                </Typography>
                <br></br>
                <Typography 
                    className="about-text"
                    variant="body1">
                    I am passionate about building practical software and I mainly focus on the frontend. This site was built using ReactJS and with the help of libraries such as <i>material-ui</i> and <i>react-transition-group</i>.
                </Typography>
                <br></br>
                <Typography
                    variant="h5">
                        Skills
                </Typography>
                <br></br>
                <Typography 
                    className="about-text"
                    variant="body1">
                    I have worked with and have experience in these languages:
                </Typography>
                <Typography
                    variant="button">
                    [HTML, CSS, JS] [ReactJS] [C] [Java] [SQL]
                </Typography> 
            </React.Fragment>
        );
    }
}