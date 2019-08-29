import React, { Component } from 'react'
import { CardContent, TextField, Card, Button } from '@material-ui/core';
import '../App.css'
import UserService from "../services/UserService"

const loginService = new UserService().login_service

export class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            Email:"",
            Password:""


        }
    }

            
    loginfun=()=>{
        console.log("Login function");
        var logindata = {
            'email':this.state.Email,
            'password': this.state.Password

        }
        loginService(logindata)
        .then(res=>{
            console.log("after login", res.data)
        })
        .catch(error=>{
            console.log("error data",error.response.data)
        })
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state)
    }

    render() {
        var cardBorder = "1px solid lightblue"
        var buttonbg = "rgb(255,140,0)"
        var buttoncl = "rgb(255,255,255)"
        return (
            <div>
                <Card id='cardMain' style={{ border: cardBorder }}>
                    <CardContent>
                        <div className='titleTxt' >
                            <span className='title'>F</span>
                            <span className='title'>U</span>
                            <span className='title'>N</span>
                            <span className='title'>D</span>
                            <span className='title'>O</span>
                            <span className='title'>O</span>
                        </div>
                        <form onSubmit={this.loginfun}>
                        <table id="table">
                            <tbody>
                                <tr>
                                    <td>
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
                                    </td>
                                </tr>
                                <tr>
                                    <td>
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
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button variant="contained"
                                        onClick={this.loginfun} 
                                            style={{
                                            // width: "100px",
                                            background:buttonbg,
                                            color:buttoncl, 
                                            marginLeft:"5em",
                                            marginTop:"25px"}} 
                                            className="loginBtn">
                                            LOGIN
                                        </Button>

                                    </td>
                                </tr>
                         
                            </tbody>
                        </table>
                        </form>
                        
                        <div id="signupLink">
                        <a href="www.google.com">Signup for fundooNotes</a>
                        </div>

                        <div id="signupLink">
                        <a href="www.google.com">Forgot your password?</a>
                        </div>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login
