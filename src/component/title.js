import React from "react";
import "./title.css";

export default class Title extends React.Component {
    render() {
        return(
            <div className="title" onClick={() => this.props.handleClick("home")}>
                <p>Kenneth Lu</p>
            </div>
        );
    }
}