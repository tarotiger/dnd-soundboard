import React from "react"; 
import "./container.css";

export default class Container extends React.Component {
    render() {
        return(
            <div className="content-container">
                {this.props.children}
            </div>
        );
    }
}