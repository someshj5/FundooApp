import React, { Component } from 'react'
import { Card, CardContent, InputBase, CardActions } from '@material-ui/core';
import "../App.css"
import archiveIcon from '../svg_icons/archive_menu.svg'
import reminderIcon from '../svg_icons/reminder.svg'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import addimageIcon from '../svg_icons/addimage.svg'
import moreIcon from '../svg_icons/more.svg'
import ColorComponent from './ColorComponent';

export default class AddNoteComponent extends Component {
    constructor() {
        super();
        this.state = {
            displayAddNote: false,
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

                <Card
                className="AddnoteCard2"
                style={{display: displaybig}}>
                    <CardContent>
                        <InputBase
                            className="AddnoteInputBase"
                            placeholder="Title" 
                        />
                        <InputBase
                        multiline
                        className="NoteTextField"
                        placeholder="Take a note..." 
                        />
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
                        <div id="closeBtnNote" onClick={()=>{this.setState({displayAddNote:false})}} >
                            Close
                        </div>

                    </CardActions>
                </Card>
                {/* </ClickAwayListener> */}
            </div>
        )
    }
}
