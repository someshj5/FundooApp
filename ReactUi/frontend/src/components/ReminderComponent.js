import React, { Component } from 'react'
import { Menu, MenuItem } from '@material-ui/core';
import reminderIcon from '../svg_icons/reminder.svg'
import NoteService from '../services/NoteService';
import "../App.css"



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
            note:[],

        }
    }


    updatedNoteRender=(e)=>{
        getANote(this.state.id)
        .then(res=>{
            this.setState({
                note:res.data.data
            })
            console.log("Getting a note", res.data)
        })
        .catch(error=>{
            console.log("error in getting a note", error.response.data)

        })

    
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



    reminderDate=(event)=>{
        event.persist();
        var today = new Date()
        var date = today.getDate()
        today.setHours(8)

        if (event.target.id === "today"){
            today.setDate(date)
        }
        if (event.target.id === "tomorrow"){
            today.setDate(date + 1 )
        }

        if (event.target.id === "nextWeek"){
            today.setDate(date + 7)

        }


        if (this.state.id){
            let UpdateData ={
                "reminder":today.toJSON(),
                "label":this.state.label,
                "collaborator": this.state.collaborator
    
            
            }
    
            var reminderData = today.toJSON()
    
            ReminderUpdate(UpdateData, this.state.id )
            .then(res=>{
                this.props.noteGetFunc()
                this.props.reminderChange(reminderData)
                this.updatedNoteRender()
                this.setState({menuOpen:false})
                console.log("reminder id", event.target.id)
                console.log("remiderData", reminderData)
                console.log(" after update", res.data);
    
            })
            .catch(error=>{
                console.log("error data", error.response)
            })

        }
        else{
            var reminderData2 = today.toJSON()
            this.props.reminderAddNote(reminderData2)
        }

       
    }




    render() {
        return (
            <div>
                <img src={reminderIcon} alt="reminderIcon"
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
                    <div className="ReminderMenu">Reminder:</div>
                    <MenuItem><p id="today" onClick={this.reminderDate}>Later today:    8:00 PM</p></MenuItem>
                    <MenuItem><p id="tomorrow" onClick={this.reminderDate}>Tomorrow   :    8:00 PM</p></MenuItem>
                    <MenuItem><p id="nextWeek" onClick={this.reminderDate}>Next week  :    8:00 PM </p></MenuItem>
                </Menu>
            </div>
        )
    }
}
