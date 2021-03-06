import React, { Component } from 'react'
import {
    Card, CardContent, CardActions, Dialog, DialogContent, InputBase,
    Divider, DialogTitle, Chip, Avatar
} from '@material-ui/core';
import "../App.css"
import addimageIcon from '../svg_icons/addimage.svg'
import isPinned from '../svg_icons/paper-push-pin.svg'

// import clockIcon from '../svg_icons/iconfinder_9_3898370.svg'

import ColorComponent from './ColorComponent';
import NoteService from '../services/NoteService'
import ReminderComponent from './ReminderComponent';
import MoreIconComponent from './MoreIconComponent';
import ArchiveComponent from './ArchiveComponent';
import CollaboratorComponent from './CollaboratorComponent';

const UpdateFunc = new NoteService().updateANote
const PinnedAnote = new NoteService().updateANote
const collaboratorGets = new NoteService().collaboratorGet






export default class NoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DialogOpen: false,
            id: props.noteobj.id,
            title: props.noteobj.title,
            text: props.noteobj.text,
            picture: null,
            is_archive: false,
            is_Trash: false,
            is_pinned: false,
            reminder: props.noteobj.reminder,
            url: null,
            color: props.noteobj.color,
            labeldata:props.noteobj.label,
            label: [],
            collaborator: [],
            collablist: [],
            collaboratorData:props.noteobj.collaborator

        }
    }

    componentDidMount() {
        this.getAllCollaborators();
        // this.props.noteGetFunc();


    }
 



    reminderChange = (data) => {
        this.setState({
            reminder: data,
        })
        console.log(this.state.reminder)
    }

    changeColor = (data) => {
        this.setState({
            color: data,

        })
        console.log(this.state)
    }


    handleDialogOpen = () => {
        this.setState({
            DialogOpen: true
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        console.log("onchangeDialog", this.state)

    }


    DeleteReminder = () => {
        let reminderData = {
            "reminder": null,
            "label": this.state.labeldata,
            "collaborator": this.state.collaboratorData

        }
        UpdateFunc(reminderData, this.state.id)
            .then(res => {
                this.props.noteGetFunc()
                this.setState({
                    reminder: null,
                })
                console.log("after deletedReminder", this.state.reminder)
            })
            .catch(error => {
                console.log("error reminderDelete", this.state.reminder)
            })


    }



    UpdateSerFunc = () => {
        let UpdateData = {
            "title": this.state.title,
            "text": this.state.text,
            "label": this.state.labeldata,
            "collaborator": this.state.collaboratorData
        }

        UpdateFunc(UpdateData, this.state.id)
            .then(res => {
                this.props.noteGetFunc()
                this.setState({ DialogOpen: false })

                console.log(" after update", res);

            })
            .catch(error => {
                console.log("error data", error)
            })

    }

    pinANote=()=>{
        this.setState({
            is_pinned: true
        })
        let UpdateData ={
            "is_pinned":this.state.is_pinned,
            "label": this.state.labeldata,
            "collaborator": this.state.collaboratorData
        }
        PinnedAnote(UpdateData, this.state.id)

        .then(res=>{
            console.log("archive update", res)
            this.props.noteGetFunc()
        })
        .catch(error=>{
            console.log("error in archiving", error)
        })
    }

    getAllCollaborators = () => {
        collaboratorGets()
            .then(res => {
                this.setState({
                    collablist: res.data.data
                })
                console.log("collaborator list", this.state.collablist)

            })
            .catch(error => {
                console.log("collaborator list error ", error.response)
            })
    }





    render() {

        const layout = this.props.layout ? "NoteCardList" : "NoteCard"

        let reminderChip = this.state.reminder

        if (reminderChip != null) {
            reminderChip = <Chip
                // avatar={<Avatar src={clockIcon} alt="Clockicon"/>}
                // style={{ marginRight: 30 }}
                label={this.state.reminder}
                onDelete={this.DeleteReminder}
            />
        }

        let DrawerLabelArray = []
      
        this.state.labeldata.map((labelobj)=>{
            console.log("labelobj", labelobj)
            console.log("Drawerlabels",  this.props.labelsArrayDash)
            this.props.labelsArrayDash.map((Dlabel)=>{
                console.log("Dlabel", Dlabel)
                if(Dlabel.id === labelobj){
                DrawerLabelArray.push(Dlabel)
            }
            return DrawerLabelArray
            })
            return DrawerLabelArray
        })
        

        let LabelChip = DrawerLabelArray.map((DlabelArray)=>{
            return <Chip
                    style={{marginTop:5 }}
                    key={DlabelArray.id}
                    label={DlabelArray.name}
                    />
        })

        let collabArr = []
        this.state.collaboratorData.map((collabobj)=>{
            console.log("collabobj", collabobj)
            this.state.collablist.map((collabuser)=>{
                console.log("collabuser",collabuser)
                if(collabuser.id === collabobj){
                    collabArr.push(collabuser)
                }
                return collabArr
            })
            return collabArr
            

           
        })
        let CollabChip = collabArr.map((collabarrobj)=>{
             return <Avatar
                    style={{ marginTop:"2%", borderWidth:2,borderStyle:"solid",borderColor:"white"}}
                   key={collabarrobj.id}
                    >{collabarrobj.username[0]  }</Avatar>
        })



        var noteCardShadow = "3px 5px 10px grey"
        return (
            <div className="ParentCard" >
                <Card className={layout} style={{ background: this.state.color, boxShadow: noteCardShadow }}>
                    <CardContent onClick={this.handleDialogOpen}>
                        <div><img className="flex-container" id="isPinned" onClick={this.pinANote} src={isPinned} alt="is_pinned"/></div>
                        <p>{this.props.noteobj.title}</p>
                        <p>{this.props.noteobj.text}</p>
                        <p>{reminderChip}</p>
                        <p>{LabelChip}</p>
                        <p>{CollabChip}</p>

                    </CardContent>
                    <CardActions>
                        <div className="flex-container">
                            <div><ReminderComponent noteGetFunc={this.props.noteGetFunc}
                                id={this.state.id} label={this.state.label} reminderChange={this.reminderChange}
                                collaborator={this.state.collaborator} /></div>
                            <div><CollaboratorComponent noteGetFunc={this.props.noteGetFunc} id={this.state.id}/></div>
                            <div><ColorComponent labeldata={this.state.labeldata} collaboratorData={this.state.collaboratorData} noteGetFunc={this.props.noteGetFunc} id={this.state.id}
                                label={this.state.label}
                                collaborator={this.state.collaborator}
                                changeColor={this.changeColor} /></div>
                            <div><img src={addimageIcon} alt="imageIcon" /></div>
                            <div><ArchiveComponent noteGetFunc={this.props.noteGetFunc} id={this.state.id}
                                label={this.state.label} collaborator={this.state.collaborator} /></div>
                            <div><MoreIconComponent labels={this.props.labels} noteGetFunc={this.props.noteGetFunc} id={this.state.id} label={this.state.label}
                                collaborator={this.state.collaborator} /></div>
                        </div>
                    </CardActions>
                </Card>


                {/* --------------------------------------------------------------------------------------------------- */}
                <Dialog
                    className="dialogbox"
                    open={this.state.DialogOpen}
                    PaperProps={{
                        style: {
                            background: this.state.color,
                            width: "90%",
                            height: "auto"
                        }
                    }}

                >
                    
                    <DialogTitle>
                    <div><img id="isPinned" onClick={this.pinANote} src={isPinned} alt="is_pinned"/></div>
                        <InputBase
                            name="title"
                            onChange={this.handleOnChange}
                            style={{ width: 500 }}
                            placeholder="Title"
                            defaultValue={this.props.noteobj.title}
                        />
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <InputBase
                            name="text"
                            onChange={this.handleOnChange}
                            multiline={true}
                            style={{ width: 500 }}
                            placeholder="Text"
                            defaultValue={this.props.noteobj.text}
                        />
                        <p>{CollabChip}</p>

                    </DialogContent>
                    {/* <DialogActions> */}
                    <div className="flex-containerDialog">
                        <div><ReminderComponent noteGetFunc={this.props.noteGetFunc} id={this.state.id}
                            label={this.state.label}
                            collaborator={this.state.collaborator} /></div>
                        <div><CollaboratorComponent id={this.state.id}/></div>
                        <div><ColorComponent noteGetFunc={this.props.noteGetFunc} id={this.state.id}
                            changeColor={this.changeColor} /></div>
                        <div><img src={addimageIcon} alt="archiveIcon" /></div>
                        <div><ArchiveComponent noteGetFunc={this.props.noteGetFunc} id={this.state.id}
                            label={this.state.label} collaborator={this.state.collaborator} /></div>
                        <div><MoreIconComponent  id={this.state.id} label={this.state.label}
                            collaborator={this.state.collaborator} /></div>
                        <div id="closeBtnNote" onClick={this.UpdateSerFunc}>Close</div>

                    </div>
                    {/* </DialogActions> */}
                </Dialog>


            </div>
        )
    }
}
