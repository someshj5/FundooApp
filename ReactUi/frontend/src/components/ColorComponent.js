import React, { Component } from 'react'
import { Menu, Avatar, Grid } from '@material-ui/core';
import colorPalleteIcon from '../svg_icons/colorPallete.svg'
import "../App.css"
import NoteService from '../services/NoteService'




const UpdateFunc = new NoteService().updateANote

export default class ColorComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            menuOpen:false,
            anchorEl:null,
            label: props.label,
            collaborator: props.collaborator,
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

        if(this.state.id){
            this.props.changeColor(event.target.id)
            console.log("update color",event.currentTarget.id)
            let UpdateData ={
                "color": event.target.id,
                "label":this.state.label,
                "collaborator": this.state.collaborator
            }
    
            UpdateFunc(UpdateData, this.state.id)
            .then(res=>{
                this.props.noteGetFunc()
                this.setState({DialogOpen:false})
    
                console.log(" after update", res);
    
            })
            .catch(error=>{
                console.log("error data", error)
            })
        }
        else{
            this.props.ColorAddNote(event.target.id)
        }
    
       
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
