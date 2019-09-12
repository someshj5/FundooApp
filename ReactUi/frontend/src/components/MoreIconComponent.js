import React, { Component } from 'react'
import moreIcon from '../svg_icons/more.svg'
import { Menu, MenuItem } from '@material-ui/core';
import NoteService from '../services/NoteService';



const TrashAnote = new NoteService().updateANote


export default class MoreIconComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            id : props.id,
            label: props.label,
            collaborator: props.collaborator,
            menuOpen:false,
            labelMenu:false,

            anchorEl:null,
            is_Trash:false ,


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



    TrashNote=()=>{
        this.setState({
            is_Trash: true
        })

        let UpdateData ={
            "is_Trash":true,
            "label": this.state.label,
            "collaborator": this.state.collaborator
        }
        TrashAnote(UpdateData, this.state.id)

        .then(res=>{
            console.log("is_trash update", res)
            this.props.noteGetFunc()
        })
        .catch(error=>{
            console.log("error in is_trash", error)
        })
    
        
    }

    AddlabelMenu=(e)=>{
        this.setState({
            labelMenu:true,
            anchorEl:e.target
            
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
                    <MenuItem id="MenuItem" ><p onClick={this.TrashNote}>Delete Note</p></MenuItem>
                    <MenuItem id="MenuItem">

                        <p onClick={this.AddlabelMenu}>
                           

                    

                        Add label
                        </p>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}
