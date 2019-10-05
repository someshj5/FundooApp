import React, { Component } from 'react'
import NoteItem from './NoteItem';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';


export default class NoteSection extends Component {
    constructor() {
        super();
        this.state = {
            id: null
        }
    }


    render() {

        let pinnedNotes = []
        let unPinnedNotes = []

        this.props.note.map((noteobj) => {
            if (noteobj.is_pinned) {
                pinnedNotes.push(noteobj)
            }
            else {
                unPinnedNotes.push(noteobj)
            }
        })
        const notes = pinnedNotes.map((noteobj) => (
            <NoteItem labelName={this.props.labelName} labelsArrayDash={this.props.labelsArrayDash} DrawerLabels={this.props.DrawerLabels} Search={this.props.Search} handleSearch={this.props.handleSearch} layout={this.props.layout} ReminderGet={this.props.ReminderGet} TrashGet={this.props.TrashGet} ArchiveGet={this.props.ArchiveGet} labels={this.props.labels} noteGetFunc={this.props.noteGetFunc} key={noteobj.id} noteobj={noteobj} />
        ))

        const Unpinnednotes = unPinnedNotes.map((noteobj) => (
            <NoteItem labelName={this.props.labelName} labelsArrayDash={this.props.labelsArrayDash} DrawerLabels={this.props.DrawerLabels} Search={this.props.Search} handleSearch={this.props.handleSearch} layout={this.props.layout} ReminderGet={this.props.ReminderGet} TrashGet={this.props.TrashGet} ArchiveGet={this.props.ArchiveGet} labels={this.props.labels} noteGetFunc={this.props.noteGetFunc} key={noteobj.id} noteobj={noteobj} />
        ))

        // const notesp = this.props.note.map((noteobj) => (
            // <NoteItem labelName={this.props.labelName} labelsArrayDash={this.props.labelsArrayDash} DrawerLabels={this.props.DrawerLabels} Search={this.props.Search} handleSearch={this.props.handleSearch} layout={this.props.layout} ReminderGet={this.props.ReminderGet} TrashGet={this.props.TrashGet} ArchiveGet={this.props.ArchiveGet} labels={this.props.labels} noteGetFunc={this.props.noteGetFunc} key={noteobj.id} noteobj={noteobj} />
        // ))


        return (
            <div
                // className="NoteSecGrid"
>
                <Divider/>
                <Grid
                    // className="NoteSecGrid"
                    container
                    justify="space-around"
                    alignContent="center"
                    style={{
                        width: 850,
                        marginTop: 20,
                        marginLeft: 250
                    }}
                    >

                    {notes}


                </Grid>

                <Divider/>
                <p id="otherTitle">Others</p>

                <Grid
                    container
                    justify="space-around"
                    alignContent="center"
                    style={{
                        width: 850,
                        marginTop: 20,
                        marginLeft: 250
                    }}>
                    {/* {notesp} */}
                    {Unpinnednotes}

                </Grid>
            </div>


        )
    }
}