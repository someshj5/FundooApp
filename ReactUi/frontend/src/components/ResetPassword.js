import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import "../App.css"
import UserService from '../services/UserService';

const resetService = new UserService().forgotPassword_service

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: ""
        }
        this.resetfunc = this.resetfunc.bind(this)

    }

    resetfunc = event => {
        event.preventDefault();
        console.log("reset function");
        var resetdata = {
            'email': this.state.Email
        }
        resetService(resetdata)
            .then(res => {
                console.log("after restpass", res.data)
                alert(res.data.message)
            })
            .catch(error => {
                console.log("error data", error.response.data)
                alert(error.response.data.error)
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
            <form onSubmit={this.resetfunc}>
                <div id='cardMain' style={{ border: cardBorder, }}>
                    <div className='titleTxtreset' >
                        <span className='title'>F</span>
                        <span className='title'>U</span>
                        <span className='title'>N</span>
                        <span className='title'>D</span>
                        <span className='title'>O</span>
                        <span className='title'>O</span>
                    </div>
                    <div style={{
                        color: "darkblue",
                        marginLeft: "180px",
                        marginTop: "45px",
                    }}>
                        <p>Forgot Password</p>
                    </div>
                    <p style={{
                        color: "darkblue",
                        marginTop: "45px",
                        marginLeft: "135px"
                    }}>
                        Enter your registered email id
                        </p>

                    <div className="resetEmailTxtf">
                        <TextField
                            required
                            onChange={this.onChange}
                            label="Email"
                            type="Email"
                            name="Email"
                            autoComplete="Email"
                            margin="normal"
                            variant="outlined"
                        />

                    </div>
                    <Button
                        type="submit"
                        variant="outlined"
                        value="Submit"
                        color="secondary"
                        style={{
                            marginLeft: "14em",
                            marginTop: "2em"
                        }}
                    >
                        SUBMIT
                    </Button>

                </div>
            </form>


        )
    }
}

export default ResetPassword
