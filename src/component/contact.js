import React from "react";
import axios from "axios";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
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
            status: '',
            error: false 
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
                    sending: false, 
                    sent: true,
                    status: 'Message sent successfully!'
                })
                this.resetForm();
            } else {
                this.setState({
                    error: true,
                    sending: false,
                    sent: true, 
                    status: `${response.data.status}`
                })
            }
        })
        .catch((error) => {
            this.setState({
                error: true,
                sending: false, 
                sent: true,
                status: `${error}`
            })
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
                { this.state.sending ? (
                    <form className="contact-form">
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </form>
                ) : (
                    <React.Fragment>
                        <form className="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <TextField 
                                className="form-textfield"
                                fullWidth
                                id="filled-basic"
                                label="Name" 
                                onChange={this.onNameChange.bind(this)}
                                variant="outlined"/>
                            <TextField 
                                className="form-textfield"
                                fullWidth
                                id="filled-basic" 
                                label="Email" 
                                onChange={this.onMailChange.bind(this)}
                                type="email"
                                variant="outlined" />
                            <TextField 
                                className="form-textfield"
                                fullWidth
                                id="filled-basic"
                                label="Message" 
                                multiline
                                onChange={this.onMessageChange.bind(this)}
                                rows="4"
                                variant="outlined" />
                            <Button
                                color="primary"
                                size="large"
                                type="submit">
                                    Submit
                            </Button>
                        </form>
                        <Snackbar 
                            open={this.state.sent} 
                            autoHideDuration={5000}>
                            { this.state.error ? (
                                <Alert severity="error"
                                    autoHideDuration={5000}>
                                    {this.state.status}
                                </Alert>
                            ) : (
                                <Alert severity="success" 
                                    autoHideDuration={5000}>
                                    Mail successfully sent!
                                </Alert>
                            )}      
                        </Snackbar>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}