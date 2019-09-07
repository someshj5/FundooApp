import React, { Component } from 'react'
import { Card, CardContent, CardActions, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import "../App.css"
import archiveIcon from '../svg_icons/archive_menu.svg'
import reminderIcon from '../svg_icons/reminder.svg'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import addimageIcon from '../svg_icons/addimage.svg'
import moreIcon from '../svg_icons/more.svg'
import ColorComponent from './ColorComponent';



export default class NoteItem extends Component {
    constructor(){
        super();
        this.state={
            color:'#fff',
            DialogOpen:false
            
        }
    }

    changeColor=(data)=>{
        this.setState({
            color:data,

        })
        console.log(this.state)
    }


    handleDialogOpen=()=>{
        
    }

    render() {

        var noteCardShadow = "3px 5px 10px grey"
        return (
            <div >
                <Card className="NoteCard" style={{ background: this.state.color,  boxShadow: noteCardShadow }}>
                    <CardContent onClick={this.handleDialogOpen}>
                        <p>{this.props.noteobj.title}</p>
                        <p>{this.props.noteobj.text}</p>
                    </CardContent>
                    <CardActions>
                        <div className="flex-container">
                            <div><img src={reminderIcon} alt="archiveIcon" /></div>
                            <div><img src={collaboratorIcon} alt="archiveIcon" /></div>
                            <div><ColorComponent changeColor={this.changeColor} /></div>
                            <div><img src={addimageIcon} alt="archiveIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><img src={moreIcon} alt="archiveIcon" /></div>
                        </div>
                    </CardActions>

                </Card>
{/* ------------------------------------------------------------------------------------- */}
                <Dialog
                className="dialogbox"
                open={true}
                >
                    <DialogContent>
                        <p>{this.props.noteobj.title}</p>
                        <p>{this.props.noteobj.text}</p>
                    </DialogContent>
                    <DialogActions>
                    <div className="flex-container">
                            <div><img src={reminderIcon} alt="archiveIcon" /></div>
                            <div><img src={collaboratorIcon} alt="archiveIcon" /></div>
                            <div><ColorComponent changeColor={this.changeColor} /></div>
                            <div><img src={addimageIcon} alt="archiveIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><img src={moreIcon} alt="archiveIcon" /></div>
                        </div>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
