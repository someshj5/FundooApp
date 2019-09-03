import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import '../App.css'
import nature from '../nature.jpeg'
import keep_icon from '../svg_icons/keep_icon.png'
import LeftDrawer from './LeftDrawer'
import { MenuItem, Menu } from '@material-ui/core'
import Redirect from 'react-router-dom/Redirect'



export class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            anchorEl: null,
            menuOpen: false,
            redirect:false
        }
        this.leftDfun = this.leftDfun.bind(this)
    }

    componentWillMount(){
        if (sessionStorage.getItem('userdata')){
            console.log("call user feed")
        }
        else{
            this.setState({redirect:true})
        }
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

    logout=event=>{
        sessionStorage.setItem("userdata","")
        sessionStorage.clear();
        this.setState({redirect:true})

    }

    handleClose = event => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: this.state.anchorEl
        })
    }
    render() {

        if(this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }

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
                            <Avatar src={nature}
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
                        <MenuItem onClick={this.logout}>Sign out</MenuItem>

                    </Menu>
                </AppBar>
                <LeftDrawer open={this.state.open} />
            </div>
        )
    }
}

export default DashboardComponent


