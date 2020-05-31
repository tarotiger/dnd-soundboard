import React from "react";
import axios from "axios";
import "typeface-roboto";
import { Typography } from "@material-ui/core";
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
        this.resetForm();

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
            message: ''
        })
    }

    render() {
        return(
            <React.Fragment>
                <form className="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <Typography>
                        Feel free to email me at kenlu.me08@gmail.com 
                    </Typography>
                    <br></br>
                    <Typography
                        variant="h5">
                        OR
                    </Typography>
                    <TextField 
                        className="form-textfield"
                        fullWidth
                        id="filled-basic"
                        label="Name" 
                        onChange={this.onNameChange.bind(this)}
                        value={this.state.name}
                        variant="outlined"/>
                    <TextField 
                        className="form-textfield"
                        fullWidth
                        id="filled-basic" 
                        label="Email" 
                        onChange={this.onMailChange.bind(this)}
                        type="email"
                        value={this.state.email}
                        variant="outlined" />
                    <TextField 
                        className="form-textfield"
                        fullWidth
                        id="filled-basic"
                        label="Message" 
                        multiline
                        onChange={this.onMessageChange.bind(this)}
                        rows="4"
                        value={this.state.message}
                        variant="outlined" />
                    <Button
                        color="primary"
                        size="large"
                        type="submit">
                            Submit
                    </Button>
                </form>
                <Snackbar
                    open={this.state.sending}
                    autoHideDuration={5000}>
                    <Alert severity="info">
                        Sending...
                    </Alert>
                </Snackbar>
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
        );
    }
}