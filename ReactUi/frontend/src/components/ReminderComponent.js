import React, { Component } from 'react'
import { Menu, MenuItem } from '@material-ui/core';
import reminderIcon from '../svg_icons/reminder.svg'
import NoteService from '../services/NoteService';



var ReminderUpdate = new NoteService().updateANote
var getANote = new NoteService().getANote

export default class ReminderComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            label: props.label,
            collaborator: props.collaborator,
            menuOpen:false,
            anchorEl:null,

        }
    }


    updatedNoteRender=()=>{
        
    }

    handleMenu=(e)=>{
        this.setState({
            menuOpen:true,
            anchorEl:e.target
        })
    }

    handleClose = e =>{
        this.setState({
            menuOpen: false,
            anchorEl: this.state.anchorEl
        })
    }

    reminderDate=(e)=>{
        var today = new Date()
        var date = today.getDate()
        today.setHours(8,0)

        if (e.target.id === "today"){
            today.setDate(date)
        }
        if (e.target.id === "tomorrow"){
            today.setDate(date + 1 )
        }

        if (e.target.id === "nextWeek"){
            today.setDate(date + 7)

        }

        let UpdateData ={
            "reminder":today.toJSON(),
            "label":this.state.label,
            "collaborator": this.state.collaborator
        }

        ReminderUpdate(UpdateData, this.state.id )
        .then(res=>{
            this.props.noteGetFunc()
            this.setState({menuOpen:false})
            console.log(" after update", res);

        })
        .catch(error=>{
            console.log("error data", error)
        })
    }


    render() {
        return (
            <div>
                <img src={reminderIcon} alt="archiveIcon"
                aria-controls="menu-appbar"
                // aria-haspopup="true"
                onClick={this.handleMenu} 
                />

                <Menu
                style={{width:900}}
                 id="menu-appbar"
                 anchorEl={this.state.anchorEl}
                 open={this.state.menuOpen}
                 onClose={this.handleClose}>
                    <MenuItem>Reminder:</MenuItem>
                    <MenuItem><p id="today" onClick={this.reminderDate}>Later today:    8:00 PM</p></MenuItem>
                    <MenuItem><p id="tomorrow" onClick={this.reminderDate}>Tomorrow   :    8:00 PM</p></MenuItem>
                    <MenuItem><p id="nextWeek" onClick={this.reminderDate}>Next week  :    8:00 PM </p></MenuItem>
                </Menu>
            </div>
        )
    }
}
