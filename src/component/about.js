import React from "react";
import AboutMarkdown from "../assets/about.md";
import ReactMarkdown from "react-markdown";
import "./about.css";

export default class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null
        }
    }

    async componentWillMount() {
        const fetched = await fetch(AboutMarkdown);
        const text = await fetched.text()
        this.setState({ text: text })
    }

    render() {
        return(
            <div className="about">
                <ReactMarkdown source={this.state.text} />
            </div>
        );
    }
}