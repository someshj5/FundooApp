import React, { Component } from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import "../App.css"
import UserService from '../services/UserService'

const signupService = new UserService().signup_service

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Username: '',
            Firstname: '',
            Lastname: '',
            Password: ''
        }
    }

    signupfun = () => {
        console.log("signup function");
        var signupdata = {
            'email': this.state.Email,
            'username': this.state.Username,
            'first_name': this.state.Firstname,
            'last_name': this.state.Lastname,
            'password': this.state.Password
        }
        signupService(signupdata)
            .then(res => {
                console.log("after signup", res.data)
            })
            .catch(error => {
                console.log("error data", error.response.data)
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
    render() {
        var cardBorder = "1px solid lightblue"

        return (

            <div>
                <Card id='cardMain2' style={{ border: cardBorder }}>
                    <CardContent >
                        <div className='titleTxt' >
                            <span className='title'>F</span>
                            <span className='title'>U</span>
                            <span className='title'>N</span>
                            <span className='title'>D</span>
                            <span className='title'>O</span>
                            <span className='title'>O</span>
                        </div>
                        <form onSubmit={this.signupfun}>
                            <div id="cardTxt">
                                <div className="usermail">
                                    <TextField className="UsernameTxt"
                                        onChange={this.onChange}
                                        id="outlined-email-input"
                                        label="Email"
                                        type="Email"
                                        name="Email"
                                        autoComplete="Email"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField className="UsernameTxt"
                                        onChange={this.onChange}
                                        id="outlined-email-input"
                                        label="Username"
                                        type="Username"
                                        name="Username"
                                        autoComplete="Username"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="usermail">
                                    <TextField className="UsernameTxt"
                                        onChange={this.onChange}
                                        id="outlined-email-input"
                                        label="Firstname"
                                        type="Firstname"
                                        name="Firstname"
                                        autoComplete="Firstname"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField className="UsernameTxt"
                                        onChange={this.onChange}
                                        id="outlined-email-input"
                                        label="Lastname"
                                        type="Lastname"
                                        name="Lastname"
                                        autoComplete="Lastname"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                                <div className="passwordTxt">
                                    <TextField className="Passwordtxt"
                                        onChange={this.onChange}
                                        name="Password"
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        variant="outlined"

                                    />
                                </div>


                            </div>
                            <Button variant="contained"
                                onClick={this.signupfun}
                                style={{
                                    // width: "100px",
                                    marginLeft: "5em",
                                    marginTop: "25px"
                                }}
                                className="loginBtn">
                                SIGNUP
                                        </Button>


                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
