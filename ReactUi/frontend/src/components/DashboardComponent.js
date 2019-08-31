import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import '../App.css'
import keep_icon from '../svg_icons/keep_icon.png'
import LeftDrawer from './LeftDrawer'
import { MenuItem, Menu } from '@material-ui/core'



export class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            anchorEl: null,
            menuOpen: false
        }
        this.leftDfun = this.leftDfun.bind(this)
    }
    leftDfun = event => {
        this.setState({
            open: !this.state.open
        })
    }

    handleMenu = event => {
        this.setState({
            menuOpen: true,
            anchorEl: event.Target
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
            <div className='root' id="main">
                <AppBar position="static" color="default">

                    <Toolbar className='ToolBar' >

                        <IconButton edge="start" color="" aria-label="menu" >
                            <MenuIcon onClick={this.leftDfun} />
                        </IconButton>

                        <div className='imgFundoo'>
                            <div>
                                <img src={keep_icon} alt='keep_icon'></img>
                            </div>
                            <div className='icon'>
                                <p>fundooNotes</p>
                            </div>
                        </div>

                        <div className='search'>
                            <InputBase
                                className="InputBase"
                                placeholder="Search" />

                            <div className='searchIcon'>
                                <SearchIcon />
                            </div>

                        </div>
                        <div className='desktopPic'>
                            <Avatar src={''}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                            />
                        </div>

                    </Toolbar>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        onClose={this.handleClose}
                        open={this.state.menuOpen}>
                        <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                        <MenuItem onClick={this.handleClose}>Sign out</MenuItem>

                    </Menu>
                </AppBar>
                <LeftDrawer open={this.state.open} />
            </div>
        )
    }
}

export default DashboardComponent

