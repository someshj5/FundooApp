import React, { Component } from 'react'
import { Card, CardContent, CardActions } from '@material-ui/core';
import "../App.css"
import archiveIcon from '../svg_icons/archive_menu.svg'
import reminderIcon from '../svg_icons/reminder.svg'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import addimageIcon from '../svg_icons/addimage.svg'
import moreIcon from '../svg_icons/more.svg'
import ColorComponent from './ColorComponent';



export default class NoteItem extends Component {
    render() {

        var noteCardShadow = "3px 5px 10px grey"
        return (
            <div >
                <Card className="NoteCard" style={{ boxShadow: noteCardShadow }}>
                    <CardContent>
                        <p>{this.props.noteobj.title}</p>
                        <p>{this.props.noteobj.text}</p>
                    </CardContent>
                    <CardActions>
                        <div className="flex-container">
                            <div><img src={reminderIcon} alt="archiveIcon" /></div>
                            <div><img src={collaboratorIcon} alt="archiveIcon" /></div>
                            <div><ColorComponent/></div>
                            <div><img src={addimageIcon} alt="archiveIcon" /></div>
                            <div><img src={archiveIcon} alt="archiveIcon" /></div>
                            <div><img src={moreIcon} alt="archiveIcon" /></div>
                        </div>
                    </CardActions>

                </Card>
            </div>
        )
    }
}
