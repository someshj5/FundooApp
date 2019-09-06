import React, { Component } from 'react'
import { Menu, MenuItem, Avatar } from '@material-ui/core';
import nature from '../nature.jpeg'


export default class MenuComponent extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            menuOpen: false,
            redirect:false
        }
    }

    logout=event=>{
        sessionStorage.setItem("userdata","")
        sessionStorage.clear();
        this.setState({redirect:true})

    }  
    handleMenu = event => {
        this.setState({
            menuOpen: true,
            anchorEl: event.target
        })
    }
    handleClose = event => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: this.state.anchorEl
        })
    }
    

    render() {
        return (
            <div>
                <div className='desktopPic'>
                            <Avatar src={nature}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                            />
                        </div>
                 <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        open={this.state.menuOpen}
                        keepMounted
                        >
                        <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                        <MenuItem onClick={this.logout}>Sign out</MenuItem>

                    </Menu>
            </div>
        )
    }
}
