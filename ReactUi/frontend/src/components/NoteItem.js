import React, { Component } from 'react'
import { Card, CardContent, CardActions, Dialog, DialogActions,DialogContent,InputBase,
    Divider, DialogTitle, Chip } from '@material-ui/core';
import "../App.css"
import archiveIcon from '../svg_icons/archive.svg'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import addimageIcon from '../svg_icons/addimage.svg'
import ColorComponent from './ColorComponent';
import NoteService from '../services/NoteService'
import ReminderComponent from './ReminderComponent';
import MoreIconComponent from './MoreIconComponent';

const UpdateFunc = new NoteService().updateANote



export default class NoteItem extends Component {
    constructor(props){
        super(props);
        this.state={
            DialogOpen:false,
            id:props.noteobj.id,
            title:props.noteobj.title,
            text: props.noteobj.text,
            picture: null,
            is_archive: false,
            is_Trash: false,
            is_pinned: false,
            reminder: props.noteobj.reminder,
            url: null,
            color:props.noteobj.color,
            label: [],
            collaborator: [],
            
        }
    }

    

    changeColor=(data)=>{
        this.setState({
            color:data,

        })
        console.log(this.state)
    }


    handleDialogOpen=()=>{
        this.setState({
            DialogOpen:true
        })
    }

    handleOnChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        })
        console.log("onchangeDialog", this.state)

    }


    DeleteReminder=()=>{
        let reminderData= {
            "reminder":null,
            "label":this.state.label,
            "collaborator": this.state.collaborator

        }
        UpdateFunc(reminderData, this.state.id)
        .then(res=>{
            this.props.noteGetFunc()
            this.setState({
                reminder:null,
            })
            console.log("after deletedReminder",this.state.reminder)
        })
        .catch(error=>{
            console.log("error reminderDelete", this.state.reminder)
        })


    }

    UpdateSerFunc=()=>{
        let UpdateData ={
            "title":  this.state.title,
            "text": this.state.text,
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


    render() {
        let reminderChip = this.state.reminder

        if (reminderChip != null){
            reminderChip = <Chip  style={{marginRight:30}} label={this.state.reminder} onDelete={this.DeleteReminder}/>
        }

        var noteCardShadow = "3px 5px 10px grey"
        return (
            <div >
                <Card className="NoteCard" style={{ background:this.state.color, boxShadow: noteCardShadow }}>
                    <CardContent onClick={this.handleDialogOpen}>
                        <p>{this.props.noteobj.title}</p>
                        <p>{this.props.noteobj.text}</p>
                            {reminderChip}

                    </CardContent>
                    <CardActions>
                        <div className="flex-container">
                            <div><ReminderComponent  noteGetFunc={this.props.noteGetFunc} id={this.state.id} label={this.state.label} 
                            collaborator={this.state.collaborator}  /></div>
                            <div><img src={collaboratorIcon} alt="collaboratorIcon" /></div>
                            <div><ColorComponent  noteGetFunc={this.props.noteGetFunc} id={this.state.id} label={this.state.label} 
                            collaborator={this.state.collaborator}
                            changeColor={this.changeColor} /></div>
                            <div><img src={addimageIcon} alt="imageIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><MoreIconComponent id={this.state.id} label={this.state.label} 
                            collaborator={this.state.collaborator} /></div>
                        </div>
                    </CardActions>

                </Card>
                
{/* --------------------------------------------------------------------------------------------------- */}
                <Dialog
                className="dialogbox"
                open={this.state.DialogOpen}
                PaperProps={{
                    style:{
                        background: this.state.color,
                        width: "90%",
                        height: "auto"
                    }
                }}
                
                >
                    <DialogTitle>
                        <InputBase
                        name="title"
                        onChange={this.handleOnChange}
                        style={{width:500}}
                        placeholder="Title"
                        defaultValue={this.props.noteobj.title}	
                        />
                        </DialogTitle>
                        <Divider/>
                    <DialogContent>
                        <InputBase
                        name="text"
                        onChange={this.handleOnChange}
                        multiline={true}
                        style={{width:500}}
                        placeholder="Text"
                        defaultValue={this.props.noteobj.text}
                        />
                    </DialogContent>                       
                    <DialogActions>
                    <div className="flex-containerDialog">
                    <div><ReminderComponent  noteGetFunc={this.props.noteGetFunc} id={this.state.id} label={this.state.label} 
                            collaborator={this.state.collaborator}  /></div>
                            <div><img src={collaboratorIcon} alt="archiveIcon" /></div>
                            <div><ColorComponent  noteGetFunc={this.props.noteGetFunc} id={this.state.id} changeColor={this.changeColor} /></div>
                            <div><img src={addimageIcon} alt="archiveIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><MoreIconComponent id={this.state.id} label={this.state.label} 
                            collaborator={this.state.collaborator} /></div>
                          
                        </div>
                        <div id="closeBtnNote" onClick={this.UpdateSerFunc}>Close</div>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
