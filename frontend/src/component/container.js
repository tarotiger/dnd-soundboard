import React from "react"; 
import "./container.css";

export default class Container extends React.Component {
    render() {
        return(
            <div className="content-container">
                <p className="tab-title">{this.props.title}</p>
                {this.props.children}
            </div>
        );
    }
}