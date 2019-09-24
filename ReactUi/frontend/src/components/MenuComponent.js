import React, { Component } from 'react'
import { Menu, MenuItem, Avatar, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import nature from '../nature.jpeg'
// import listView from '../svg_icons/listview.svg'

export default class MenuComponent extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            menuOpen: false,
            redirect: false,
            Dopen: false,
        }
    }

    logout = event => {
        sessionStorage.setItem("userdata", "")
        sessionStorage.clear();
        this.props.signOut()
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

    handleDialog = () => {
        this.setState({
            Dopen: true
        })
    }

    CloseDialog=()=>{
        this.setState({
            Dopen: false
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
                    <MenuItem onClick={this.handleClose}><p onClick={this.handleDialog}>My Account</p></MenuItem>
                    <MenuItem onClick={this.logout}>Sign out</MenuItem>

                </Menu>
                <Dialog
                    open={this.state.Dopen}
                    PaperProps={{
                        style: {
                            background: this.state.color,
                            width: "23%",
                            height: "60%"
                        }
                    }}>

                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                      <p onClick={this.CloseDialog}>Cancel</p>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}
