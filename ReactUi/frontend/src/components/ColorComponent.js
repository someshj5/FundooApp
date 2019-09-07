import React, { Component } from 'react'
import { Menu, Avatar, Grid } from '@material-ui/core';
import colorPalleteIcon from '../svg_icons/colorPallete.svg'
import "../App.css"


export default class ColorComponent extends Component {
    constructor(){
        super();
        this.state={
            menuOpen:false,
            anchorEl:null,
            colors:[
                {value:"#fff"},
                {value:"#f28b82"},
                {value:"#fbbc04"},
                {value:"#fff475"},
                {value:"#ccff90"},
                {value:"#a7ffeb"},
                {value:"#cbf0f8"},
                {value:"#aecbfa"},
                {value:"#d7aefb"},
                {value:"#fdcfe8"},
                {value:"#e6c9a8"},
                {value:"#e8eaed"},

            ],
        }
    }




    handleMenu = e =>{
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

    changeColor = event =>{
        this.props.changeColor(event.target.id)
        console.log("update color",event.currentTarget.id)
    }

    render() {

        const colorPalette = this.state.colors.map((colorp)=>{
            return <Avatar
                id={colorp.value}
                key={colorp.value}
                onClick={this.changeColor}  
                style={{borderWidth: 1,
                margin:1,
                borderStyle:'solid', 
                borderColor:'grey',
                background:colorp.value ,
                height:25,
                width:25}}></Avatar>
        })
        return (
            <div>
                <img 
                aria-controls="menu-appbar"
                // aria-haspopup="true"
                onClick={this.handleMenu} 
                src={colorPalleteIcon}
                alt="colorPalleteIcon" />

                <Menu
                // anchorReference="anchorPosition"
                // anchorPosition={{ top: 456, left: 320 }}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'right',
                //   }}
                //   transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                //   }}
                
                id="menu-appbar"
                style={{width:250}}
                anchorEl={this.state.anchorEl}
                open={this.state.menuOpen}
                onClose={this.handleClose}
                >
                    <Grid
                    container
                    justify="space-evenly"
                    style={{
                    width:120,
                    }}
                    >
                    {colorPalette}
                    </Grid>
                </Menu>
            </div>
        )
    }
}
