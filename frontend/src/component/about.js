import React from "react";
import axios from "axios";
import "./about.css";

export default class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    onNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    onMailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    onMessageChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        axios({
            method: "POST",
            url: "http://localhost:5000/send",
            data: this.state 
        })
        .then((response) => {
            if (response.data.status === 'success') {
                alert("Message sent");
                this.resetForm();
            } else {
                alert("message failed to send");
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }

    render() {
        return(
            <React.Fragment>
                <div>
                    <p className="about-text">
                        Hi, I'm Kenneth Lu. Currently undertaking a Bachelor of Science 
                        (Computer Science). On the side, 
                    </p>
                </div>

                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onMailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}