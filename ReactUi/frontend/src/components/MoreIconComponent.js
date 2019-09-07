import React, { Component } from 'react'
import moreIcon from '../svg_icons/more.svg'
import { Menu, MenuItem } from '@material-ui/core';


export default class MoreIconComponent extends Component {
    constructor(){
        super();
        this.state={
            menuOpen:false,
            anchoerEl:null
        }
    }
    render() {
        return (
            <div>
                <img src={moreIcon} alt="moreIcon" />

                <Menu
                id="menu"
                open={this.state.menuOpen}>
                    <MenuItem>Delete Note</MenuItem>
                    <MenuItem>Add label</MenuItem>
                </Menu>
            </div>
        )
    }
}
