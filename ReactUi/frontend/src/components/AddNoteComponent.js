import React, { Component } from 'react'
import { Card, CardContent, InputBase } from '@material-ui/core';
import "../App.css"

export default class AddNoteComponent extends Component {
    constructor() {
        super();
        this.state = {
            displayAddNote: false
        }
    }


    addNoteToggle = e => {
        this.setState({ displayAddNote: !this.state.displayAddNote })
        console.log("========>", this.state)
    }
    render() {
        let displaysmall = "block"
        if (this.state.displayAddNote) {
            displaysmall = "none"
        }
        return (
            <div>
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
            </div>
        )
    }
}
