import React from "react";
import axios from "axios";
import "./contact.css";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            sending: false,
            sent: false,
            status: ''
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

        this.setState({
            sending: true
        })

        axios({
            method: "POST",
            url: "http://localhost:5000/send",
            data: this.state 
        })
        .then((response) => {
            if (response.data.status === 'success') {
                this.setState({
                    sent: true,
                    status: 'Message sent successfully!'
                })
                this.resetForm();
            } else {
                this.setState({
                    status: 'Message failed to send...'
                })
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: '',
            sending: false
        })
    }

    render() {
        return(
            <React.Fragment>
                {this.state.sending ? (
                    <div className="contact-form">
                        <img alt="sending-gif" className="sending-gif" src={require("../assets/sending.gif")}></img>
                    </div> 
                ) : (
                    <React.Fragment>
                        <form className="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <p className="form-text">Drop me a message below</p>
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
                                <textarea className="form-control form-message" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                            </div>
                            <button type="submit" className="btn-lg btn-primary">Submit</button>
                        </form>
                        {this.state.sent ? (
                            <p className="mail-status">{this.state.status}</p>
                        ) : (
                            null
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}