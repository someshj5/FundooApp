import React, { Component } from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import "../App.css"
import UserService from '../services/UserService'
import Redirect from 'react-router-dom/Redirect'


const signupService = new UserService().signup_service

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Username: '',
            Firstname: '',
            Lastname: '',
            Password: '',
            redirect:false
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
        this.setState({redirect:true})

        signupService(signupdata)
            .then(res => {
                sessionStorage.setItem('userdata', res.data)
                console.log("after signup", res.data)
                this.setState({ redirect: true })

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

        if(this.state.redirect){
            return (<Redirect to={"/dashboard"}/>)
        }

        return (

            <div>
                <form onSubmit={this.signupfun}>
                <Card id='cardMain2' style={{ border: cardBorder }}>
                    <CardContent >
                        <div className='FundooSignupTitleTxt' >
                            <span className='title'>F</span>
                            <span className='title'>U</span>
                            <span className='title'>N</span>
                            <span className='title'>D</span>
                            <span className='title'>O</span>
                            <span className='title'>O</span>
                        </div>
                        <div style={{
                            color:"darkblue",
                            fontSize:"19px",
                            marginTop:"1em",
                            marginLeft:"9em",

                        }}>
                            <p>    
                                Create your fundooapp account
                            </p>
                        </div>

                        
                            <div>
                                <div className="usermail" style={{marginTop:"3em"}}>
                                    <TextField className="UsernameTxt"
                                        required
                                        onChange={this.onChange}
                                        label="Email"
                                        type="Email"
                                        name="Email"
                                        margin="normal"
                                        variant="outlined"
                                        
                                    />
                                    <TextField className="UsernameTxt"
                                        required
                                        onChange={this.onChange}
                                        label="Username"
                                        type="Username"
                                        name="Username"
                                        margin="normal"
                                        variant="outlined"
                                        
                                    />
                                </div>
                                <div className="usermail">
                                    <TextField className="UsernameTxt"
                                        required
                                        onChange={this.onChange}
                                        label="Firstname"
                                        type="Firstname"
                                        name="Firstname"
                                        margin="normal"
                                        variant="outlined"
                                        
                                    />
                                    <TextField className="UsernameTxt"
                                        required
                                        onChange={this.onChange}
                                        label="Lastname"
                                        type="Lastname"
                                        name="Lastname"
                                        margin="normal"
                                        variant="outlined"
                                        
                                    />
                                </div>
                                <div className="passwordTxt">
                                    <TextField className="Passwordtxt"
                                        required
                                        onChange={this.onChange}
                                        name="Password"
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        variant="outlined"

                                    />
                                </div>


                            </div>
                            <Button 
                                variant="outlined"
                                color="secondary"
                                type="submit"
                                
                                style={{
                                    width: "200px",
                                    marginLeft: "200px",
                                    marginTop: "25px"
                                }}
                                className="loginBtn">
                                REGISTER
                                        </Button>

                <div style={{marginTop:'2em' , marginLeft:250}}  >
                    <p style={{marginLeft:38, fontWeight:500}}>OR</p>
                    <a href="/login">Login in stead</a>
                </div>
                    </CardContent>
                </Card>
                </form>
            </div>
        )
    }
}
