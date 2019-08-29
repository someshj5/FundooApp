import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
// import { Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import '../App.css'
import keep_icon from '../svg_icons/keep_icon.png'
import LeftDrawer from './LeftDrawer'

function Dashboard() {

    return (
        <div className='root' id="main">
            <AppBar position="static" color="default">
                
                <Toolbar className='ToolBar' >

                    <IconButton edge="start" color="" aria-label="menu" >
                        <MenuIcon />
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
                        <Avatar src={''} />
                    </div>

                </Toolbar>

            </AppBar>
            <LeftDrawer />
        </div>

    )
}

export default Dashboard

