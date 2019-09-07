import React, { Component } from 'react'
import { Card, CardContent, InputBase, CardActions } from '@material-ui/core';
import "../App.css"
import archiveIcon from '../svg_icons/archive_menu.svg'
import reminderIcon from '../svg_icons/reminder.svg'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import addimageIcon from '../svg_icons/addimage.svg'
import ColorComponent  from './ColorComponent'
import NoteService from '../services/NoteService'
import MoreIconComponent from './MoreIconComponent'

var createNote = new NoteService().createNote

export default class AddNoteComponent extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            text: "",
            picture: null,
            is_archive: false,
            is_Trash: false,
            is_pinned: false,
            reminder: null,
            url: null,
            color: null,
            label: [],
            collaborator: [],
            displayAddNote: false,
        }
    }

        onChange=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
            console.log(this.state)
        }
        

        createNewNote=()=>{
            console.log("notecreate" );
           
        }

        handleClose=(event)=>{

            var noteData={
                "title":  this.state.title,
                "text": this.state.text,
                "picture": this.state.picture,
                "is_archive": this.state.is_archive,
                "is_Trash": this.state.is_Trash,
                "is_pinned": this.state.is_pinned,
                "reminder": this.state.reminder,
                "url": this.state.url,
                "color": this.state.color,
                "user": sessionStorage.getItem('userid'),
                "label":this.state.label,
                "collaborator": this.state.collaborator
            }

            if(this.state.title === "" || this.state.text === ""){
                return this.setState({displayAddNote:false})
            }
            else{
                createNote(noteData)
                .then(res=>{
                    this.props.noteGetFunc()
                    this.setState({ 
                        title:"",
                        text: "",
                        picture: null,
                        is_archive: false,
                        is_Trash: false,
                        is_pinned: false,
                        reminder: null,
                        url: null,
                        color: null,
                        label: [],
                        collaborator: [],})
                    console.log("note detail", res.data)
    
                })
                .catch(error=>{
                    console.log("error data", error.response.data)
                })
            }

        
        }
    

    addNoteToggle = e => {
        this.setState({ displayAddNote: !this.state.displayAddNote })
        console.log("========>", this.state)
    }

    render() {
        let displaybig = "none"
        let displaysmall = "block"
        if (this.state.displayAddNote) {
            displaysmall = "none"
            displaybig = "block"
        }
        return (
            <div>
                {/* <ClickAwayListener onClickAway={() => {this.setState({displayAddNote:false})}}> */}
                <Card className="AddnoteCard" 
                onClick={this.addNoteToggle} 
                style={{ display: displaysmall }}>
                    <CardContent>
                        <div>
                            <InputBase
                                className="AddnoteInputBase"
                                placeholder="Take a note..." />
                        </div>
                    </CardContent>
                </Card>
{/* ---------------------------------------------------------------------------------- */}
                <Card
                className="AddnoteCard2"
                style={{display: displaybig}}>
                    <CardContent>
                        <InputBase

                            onChange={this.onChange}
                            name="title"
                            className="AddnoteInputBase"
                            placeholder="Title" 
                        />
                        <InputBase

                        onChange={this.onChange}
                        multiline
                        name="text"
                        className="NoteTextField"
                        placeholder="Take a note..." 
                        />
                    </CardContent>
                    <CardActions>
                        <div className="flex-container">
                            <div><img src={reminderIcon} alt="archiveIcon" /></div>
                            <div><img src={collaboratorIcon} alt="archiveIcon" /></div>
                            <div><ColorComponent /></div>
                            <div><img src={addimageIcon} alt="archiveIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><MoreIconComponent/></div>
                        </div>
                        <div id="closeBtnNote" onClick={this.handleClose} >
                            Close
                        </div>

                    </CardActions>
                </Card>
                {/* </ClickAwayListener> */}
            </div>
        )
    }
}
