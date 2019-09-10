import React, { Component } from 'react'
import moreIcon from '../svg_icons/more.svg'
import { Menu, MenuItem } from '@material-ui/core';


export default class MoreIconComponent extends Component {
    constructor(){
        super();
        this.state={
            menuOpen:false,
            anchorEl:null
        }
    }

    handleMenu=(e)=>{
        this.setState({
            menuOpen:true,
            anchorEl:e.target
        })
    }
    handleClose = e =>{
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: this.state.anchorEl
        })
    }
    render() {
        return (
            <div>
                <img  onClick={this.handleMenu} aria-controls="Moremenu"src={moreIcon} alt="moreIcon" />

                <Menu
                id="Moremenu"
                onClose={this.handleClose}
                anchorEl={this.state.anchorEl}
                open={this.state.menuOpen}>
                    <MenuItem id="MenuItem" >Delete Note</MenuItem>
                    <MenuItem id="MenuItem">Add label</MenuItem>
                </Menu>
            </div>
        )
    }
}
